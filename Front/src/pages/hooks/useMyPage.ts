import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserBasicInfo, updateUserBasicInfo, getUserAddInfo, updateUserAddInfo } from "../../api/UserApi";
import type { UserAddInfo } from "../../types/user";

// 기본 정보 폼 타입
export interface BasicFormState {
    userName: string;
    loginId: string;
    email: string;
    authType: string;
}

// 모든 필드를 string으로 관리, 전송 시 변환
export interface AddInfoFormState {
    birthDate: string;
    targetType: string;
    marriageStatus: string;
    childCount: string;
    houseOwn: string;
    asset: string;
    income: string;
}

export const useMyPage = () => {
    const { updateUserState } = useAuth();

    // ================= 기본 정보 로직 =================
    const [isBasicEditing, setIsBasicEditing] = useState(false);
    const [savedBasicData, setSavedBasicData] = useState<BasicFormState>({
        userName: "",
        loginId: "",
        email: "",
        authType: "",
    });
    const [basicFormData, setBasicFormData] = useState<BasicFormState>({
        userName: "",
        loginId: "",
        email: "",
        authType: "",
    });

    const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setBasicFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleBasicSubmit = async (e: React.FormEvent, onRefresh: () => void) => {
        e.preventDefault();
        if (!basicFormData.userName || !basicFormData.email) {
            alert("이름과 이메일은 필수입니다.");
            return;
        }

        try {
            await updateUserBasicInfo({
                userName: basicFormData.userName,
                email: basicFormData.email
            });

            updateUserState({
                userName: basicFormData.userName
            });

            setSavedBasicData({
                ...basicFormData,
                loginId: savedBasicData.loginId
            });

            alert("저장되었습니다!");
            setIsBasicEditing(false);
            onRefresh();
        } catch (error) {
            console.error("기본 정보 저장 실패:", error);
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const cancelBasicEdit = () => {
        setIsBasicEditing(false);
        setBasicFormData(savedBasicData);
    };


    // ================= 추가 정보 로직 =================
    const [isAddInfoEditing, setIsAddInfoEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [addInfoFormData, setAddInfoFormData] = useState<AddInfoFormState>({
        birthDate: "",
        targetType: "",
        marriageStatus: "",
        childCount: "",
        houseOwn: "",
        asset: "",
        income: "",
    });

    const [savedData, setSavedData] = useState<UserAddInfo>({
        birthDate: null,
        targetType: null,
        marriageStatus: null,
        childCount: null,
        houseOwn: null,
        asset: null,
        income: null,
    });

    // 데이터 초기 로드
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const [basicData, addData] = await Promise.all([
                    getUserBasicInfo(),
                    getUserAddInfo()
                ]);

                setSavedData(addData);

                setSavedBasicData({
                    userName: basicData.userName,
                    loginId: basicData.loginId,
                    email: basicData.email,
                    authType: basicData.authType,
                });

                setBasicFormData({
                    userName: basicData.userName,
                    loginId: basicData.loginId,
                    email: basicData.email,
                    authType: basicData.authType,
                });

                setAddInfoFormData({
                    birthDate: addData.birthDate || "",
                    targetType: addData.targetType || "",
                    marriageStatus: addData.marriageStatus || "",
                    childCount: addData.childCount !== null ? String(addData.childCount) : "",
                    houseOwn: addData.houseOwn || "",
                    asset: addData.asset !== null ? String(addData.asset) : "",
                    income: addData.income !== null ? String(addData.income) : "",
                });
            } catch (error) {
                console.error("추가 정보 로딩 실패:", error);
            }
        };
        fetchAllData();
    }, []);

    const handleAddInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setAddInfoFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleAddInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload: UserAddInfo = {
            birthDate: addInfoFormData.birthDate === "" ? null : addInfoFormData.birthDate,
            targetType: addInfoFormData.targetType === "" ? null : (addInfoFormData.targetType as UserAddInfo["targetType"]),
            marriageStatus: addInfoFormData.marriageStatus === "" ? null : (addInfoFormData.marriageStatus as UserAddInfo["marriageStatus"]),
            childCount: addInfoFormData.childCount === "" ? null : Number(addInfoFormData.childCount),
            houseOwn: addInfoFormData.houseOwn === "" ? null : (addInfoFormData.houseOwn as UserAddInfo["houseOwn"]),
            asset: addInfoFormData.asset === "" ? null : Number(addInfoFormData.asset),
            income: addInfoFormData.income === "" ? null : Number(addInfoFormData.income),
        };

        try {
            await updateUserAddInfo(payload);
            alert("성공적으로 수정되었습니다!");
            setSavedData(payload);
            setIsAddInfoEditing(false);
        } catch (error) {
            console.error("추가 정보 저장 실패:", error);
            alert("저장에 실패했습니다. 다시 시도해주세요.");
        } finally {
            setIsLoading(false);
        }
    };

    return {
        // 기본 정보 상태 & 메서드
        isBasicEditing,
        setIsBasicEditing,
        savedBasicData,
        basicFormData,
        handleBasicChange,
        handleBasicSubmit,
        cancelBasicEdit,

        // 추가 정보 상태 & 메서드
        isAddInfoEditing,
        setIsAddInfoEditing,
        isLoading,
        addInfoFormData,
        savedData,
        handleAddInfoChange,
        handleAddInfoSubmit,
    };
};
