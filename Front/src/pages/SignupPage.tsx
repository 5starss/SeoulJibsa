import { Link, useNavigate } from "react-router-dom";
import { useSignup } from "./hooks/useSignup";
import SignupTerms from "../components/auth/SignupTerms";

export default function SignupPage() {
  const navigate = useNavigate();
  const {
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
  } = useSignup();

  return (
    <div className="bg-white flex flex-col items-center my-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-[2rem] shadow-lg border border-gray-100 p-8 md:p-10 relative">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
            <img
              src="/seouljibsa.png"
              alt="서울집사 로고"
              className="w-8 h-8 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-[#111814] mb-1">
            서울집사 회원가입
          </h2>
          <p className="text-sm text-gray-500 font-medium">
            청년과 신혼부부를 위한 맞춤형 주거지원 서비스
          </p>
        </div>

        <form className="space-y-5">
          {/* 아이디 */}
          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-800 ml-1">
              아이디
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[22px]">
                  person
                </span>
              </div>
              <input
                type="text"
                name="userId"
                value={formData.userId}
                onChange={handleChange}
                className={[
                  "w-full pl-12 pr-4 py-3.5 rounded-2xl border text-gray-900 outline-none transition-all placeholder:text-gray-300",
                  errors.userId
                    ? "border-red-500 focus:ring-4 focus:ring-red-200/40"
                    : status.isIdChecked
                      ? "border-primary focus:ring-4 focus:ring-primary/10"
                      : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10",
                ].join(" ")}
                placeholder="아이디를 입력해주세요"
              />
            </div>

            {(errors.userId || idMessage) && (
              <div className="mt-1 ml-1">
                {errors.userId ? (
                  <p className="text-red-500 text-xs">{errors.userId}</p>
                ) : (
                  <p
                    className={[
                      "text-xs font-bold min-h-5",
                      status.isIdChecked ? "text-primary" : "text-red-500",
                    ].join(" ")}
                  >
                    {idMessage}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 비밀번호 */}
          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-800 ml-1">
              비밀번호
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[22px]">
                  lock
                </span>
              </div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={[
                  "w-full pl-12 pr-4 py-3.5 rounded-2xl border text-gray-900 outline-none transition-all placeholder:text-gray-300",
                  errors.password
                    ? "border-red-500 focus:ring-4 focus:ring-red-200/40"
                    : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10",
                ].join(" ")}
                placeholder="8~20자 (소문자, 숫자, 특수문자 포함)"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1 ml-1">{errors.password}</p>
            )}
          </div>

          {/* 비밀번호 확인 */}
          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-800 ml-1">
              비밀번호 확인
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[22px]">
                  lock
                </span>
              </div>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={[
                  "w-full pl-12 pr-4 py-3.5 rounded-2xl border text-gray-900 outline-none transition-all placeholder:text-gray-300",
                  isPasswordMismatch
                    ? "border-red-500 focus:ring-4 focus:ring-red-200/40"
                    : isPasswordMatch
                      ? "border-primary focus:ring-4 focus:ring-primary/10"
                      : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10",
                ].join(" ")}
                placeholder="비밀번호를 다시 입력해주세요"
              />
            </div>

            {isPasswordMismatch && (
              <p className="text-red-500 text-xs mt-1 ml-1 font-medium">
                비밀번호가 일치하지 않습니다.
              </p>
            )}
            {isPasswordMatch && (
              <p className="text-primary text-xs mt-1 ml-1 font-medium">
                비밀번호가 일치합니다.
              </p>
            )}
          </div>

          {/* 이름 */}
          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-800 ml-1">
              이름
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-gray-400 text-[22px]">
                  badge
                </span>
              </div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 text-gray-900 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-300"
                placeholder="이름을 입력해주세요"
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className="space-y-1">
            <label className="block text-sm font-bold text-gray-800 ml-1">
              이메일
            </label>

            <div className="flex gap-3">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-gray-400 text-[22px]">
                    mail
                  </span>
                </div>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={status.isEmailVerified}
                  className={[
                    "w-full pl-12 pr-4 py-3.5 rounded-2xl border text-gray-900 outline-none transition-all placeholder:text-gray-300",
                    errors.email
                      ? "border-red-500 focus:ring-4 focus:ring-red-200/40"
                      : status.isEmailVerified
                        ? "bg-gray-50 text-gray-500 border-gray-200"
                        : "border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10",
                  ].join(" ")}
                  placeholder="example@email.com"
                />
              </div>

              <button
                type="button"
                onClick={handleSendVerification}
                disabled={status.isEmailVerified}
                className={[
                  "px-5 h-[52px] font-bold rounded-2xl transition-colors whitespace-nowrap text-sm",
                  status.isEmailVerified
                    ? "bg-primary/15 text-primary cursor-default"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200",
                ].join(" ")}
              >
                {status.isEmailVerified
                  ? "인증 완료"
                  : status.isEmailSent
                    ? "재전송"
                    : "인증번호 전송"}
              </button>
            </div>

            {(errors.email || emailMessage) && (
              <div className="mt-1 ml-1">
                {errors.email ? (
                  <p className="text-red-500 text-xs">{errors.email}</p>
                ) : (
                  <p
                    className={[
                      "text-xs font-bold min-h-5",
                      status.isEmailChecked ? "text-primary" : "text-red-500",
                    ].join(" ")}
                  >
                    {emailMessage}
                  </p>
                )}
              </div>
            )}

            {status.isEmailSent && !status.isEmailVerified && (
              <div className="flex gap-3 mt-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    name="verificationCode"
                    value={formData.verificationCode}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-gray-300"
                    placeholder="인증번호 6자리"
                    maxLength={6}
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-medium text-red-500">
                    {formatTime(status.timeLeft)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleVerifyCode}
                  className="px-5 h-[52px] bg-gray-100 text-gray-600 font-bold rounded-2xl hover:bg-gray-200 transition-colors whitespace-nowrap text-sm"
                >
                  확인
                </button>
              </div>
            )}
          </div>

          <SignupTerms
            agreements={agreements}
            isAllAgreed={isAllAgreed}
            toggleAgreement={toggleAgreement}
            toggleAll={toggleAll}
          />

          <button
            type="button"
            onClick={() => handleSignup(() => navigate("/login"))}
            className="w-full bg-primary text-white font-bold text-lg h-14 rounded-2xl hover:brightness-105 shadow-lg shadow-primary/20 transition-all active:scale-[0.98] mt-2"
          >
            회원가입 완료
          </button>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="text-primary font-bold hover:underline ml-1">
              로그인
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
