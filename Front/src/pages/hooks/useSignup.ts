import { useState, useEffect } from "react";
import { checkDuplicate, sendVerificationCode, verifyCode, registerUser } from "../../api/AuthApi";
import axios from "axios";

export const useSignup = () => {
  // 입력 데이터
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    verificationCode: "",
  });

  // 유효성 검사
  const [errors, setErrors] = useState({
    userId: "",
    password: "",
    email: "",
  });

  // 진행 상태 관리
  const [status, setStatus] = useState({
    isIdChecked: false,
    isEmailChecked: false,
    isEmailSent: false,
    isEmailVerified: false,
    timeLeft: 300,
  });

  const [idMessage, setIdMessage] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  // 약관 동의
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
  });

  // 비밀번호 일치 여부 계산
  const isPasswordMismatch = formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword;
  const isPasswordMatch = formData.confirmPassword.length > 0 && formData.password === formData.confirmPassword;
  const isAllAgreed = agreements.terms && agreements.privacy;

  // 실시간 아이디 중복 확인
  useEffect(() => {
    if (!formData.userId || errors.userId) return;

    const timer = window.setTimeout(async () => {
      try {
        const result = await checkDuplicate("loginId", formData.userId);

        if (result.available) {
          setIdMessage("사용 가능한 아이디입니다.");
          setStatus((prev) => ({ ...prev, isIdChecked: true }));
        } else {
          setIdMessage("이미 사용 중인 아이디입니다.");
          setStatus((prev) => ({ ...prev, isIdChecked: false }));
        }
      } catch (error) {
        console.error("중복 확인 에러:", error);
        setIdMessage("중복 확인 중 오류가 발생했습니다.");
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.userId, errors.userId]);

  // 실시간 이메일 중복 확인
  useEffect(() => {
    if (!formData.email || errors.email || status.isEmailVerified) return;

    const timer = window.setTimeout(async () => {
      try {
        const result = await checkDuplicate("email", formData.email);

        if (result.available) {
          setEmailMessage("사용 가능한 이메일입니다.");
          setStatus((prev) => ({ ...prev, isEmailChecked: true }));
        } else {
          setEmailMessage("이미 사용 중인 이메일입니다.");
          setStatus((prev) => ({ ...prev, isEmailChecked: false }));
        }
      } catch (error) {
        console.error("중복 확인 에러:", error);
        setEmailMessage("중복 확인 중 오류가 발생했습니다.");
        setStatus((prev) => ({ ...prev, isEmailChecked: false }));
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [formData.email, errors.email, status.isEmailVerified]);

  // 타이머
  useEffect(() => {
    let timer: number;
    if (status.isEmailSent && !status.isEmailVerified && status.timeLeft > 0) {
      timer = window.setInterval(() => {
        setStatus((prev) => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [status.isEmailSent, status.isEmailVerified, status.timeLeft]);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? `0${sec}` : sec}`;
  };

  // 유효성 검사
  const validateField = (name: string, value: string) => {
    let errorMessage = "";

    if (name === "userId") {
      const idRegex = /^[a-zA-Z0-9]+$/;
      if (!value) errorMessage = "";
      else if (!idRegex.test(value)) errorMessage = "아이디는 영문과 숫자만 사용할 수 있습니다.";
      else if (value.length > 50) errorMessage = "아이디는 50자 이하여야 합니다.";
    } else if (name === "password") {
      const pwRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*]).{8,20}$/;
      if (!value) errorMessage = "";
      else if (!pwRegex.test(value)) {
        errorMessage = "8~20자, 소문자/숫자/특수문자(!@#$%^&*) 포함 필수";
      }
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value) errorMessage = "";
      else if (!emailRegex.test(value)) errorMessage = "올바른 이메일 형식이 아닙니다.";
    }

    return errorMessage;
  };

  // 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    const errorMsg = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: errorMsg }));

    if (name === "userId") {
      setIdMessage("");
      setStatus((prev) => ({ ...prev, isIdChecked: false }));
    }

    if (name === "email") {
      setEmailMessage("");
      setStatus((prev) => ({
        ...prev,
        isEmailSent: false,
        isEmailVerified: false,
        isEmailChecked: false,
        timeLeft: 300,
      }));
      setFormData((prev) => ({ ...prev, verificationCode: "" }));
    }
  };

  // 이메일 인증번호 전송
  const handleSendVerification = async () => {
    if (!formData.email) return alert("이메일을 입력해주세요.");
    if (errors.email) return alert("올바른 이메일 형식을 입력해주세요.");
    if (!status.isEmailChecked) return alert("이메일 중복 확인이 필요합니다.");

    try {
      await sendVerificationCode(formData.email);
      alert("인증번호가 전송되었습니다.");
      setStatus((prev) => ({
        ...prev,
        isEmailSent: true,
        isEmailVerified: false,
        timeLeft: 300,
      }));
    } catch (err: unknown) {
      const statusCode = axios.isAxiosError(err) ? err.response?.status : undefined;

      if (statusCode === 429) {
        alert("요청이 너무 많습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      alert("인증번호 전송에 실패했습니다.");
    }
  };

  // 인증번호 확인
  const handleVerifyCode = async () => {
    if (!formData.email) return;
    if (!formData.verificationCode) return;

    try {
      const result = await verifyCode(formData.email, formData.verificationCode);

      if (result.verified) {
        alert("이메일 인증이 완료되었습니다.");
        setStatus((prev) => ({ ...prev, isEmailVerified: true }));
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (err: unknown) {
      const statusCode = axios.isAxiosError(err) ? err.response?.status : undefined;

      if (statusCode === 410) {
        alert("인증코드가 만료되었습니다. 재전송 해주세요.");
        return;
      }
      if (statusCode === 429) {
        alert("인증 시도 횟수를 초과했습니다. 잠시 후 다시 시도해주세요.");
        return;
      }

      alert("인증 확인에 실패했습니다.");
    }
  };

  // 약관 토글
  const toggleAll = () => {
    const newValue = !isAllAgreed;
    setAgreements({ terms: newValue, privacy: newValue });
  };
  const toggleAgreement = (key: keyof typeof agreements) => {
    setAgreements((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // 최종 회원가입 요청
  const handleSignup = async (onSuccess: () => void) => {
    if (Object.values(errors).some((msg) => msg !== "")) {
      alert("입력 정보를 다시 확인해주세요.");
      return;
    }

    if (
      !formData.userId ||
      !formData.password ||
      !formData.confirmPassword ||
      !formData.name ||
      !formData.email
    ) {
      alert("모든 필수 정보를 입력해주세요.");
      return;
    }

    if (!status.isIdChecked) return alert("아이디 중복 확인을 해주세요.");
    if (formData.password !== formData.confirmPassword) return alert("비밀번호가 일치하지 않습니다.");
    if (!status.isEmailVerified) return alert("이메일 인증을 완료해주세요.");
    if (!isAllAgreed) return alert("필수 약관에 모두 동의해주세요.");

    const success = await registerUser(formData);
    if (success) {
      alert(`${formData.name}님, 회원가입이 완료되었습니다!`);
      onSuccess();
    }
  };

  return {
    formData,
    errors,
    status,
    idMessage,
    emailMessage,
    agreements,
    isPasswordMismatch,
    isPasswordMatch,
    isAllAgreed,
    handleChange,
    handleSendVerification,
    handleVerifyCode,
    toggleAll,
    toggleAgreement,
    handleSignup,
    formatTime,
  };
};
