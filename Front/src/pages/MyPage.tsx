import { useState } from "react";
import { withdrawAccount, confirmPasswordAPI } from "../api/AuthApi";
import WithdrawModal from "../components/modals/WithdrawModal";
import { useMyPage } from "./hooks/useMyPage";
import MyPageBasicInfo from "../components/auth/MyPageBasicInfo";
import MyPageAddInfo from "../components/auth/MyPageAddInfo";

export default function MyPage() {
  const {
    isBasicEditing,
    setIsBasicEditing,
    savedBasicData,
    basicFormData,
    handleBasicChange,
    handleBasicSubmit,
    cancelBasicEdit,

    isAddInfoEditing,
    setIsAddInfoEditing,
    isLoading,
    addInfoFormData,
    savedData,
    handleAddInfoChange,
    handleAddInfoSubmit,
  } = useMyPage();

  // 탈퇴 모달 상태 관리
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);

  // 탈퇴 버튼 클릭 시 모달 열기
  const handleWithdrawClick = () => {
    setIsWithdrawModalOpen(true);
  };

  // 모달에서 비밀번호 입력 후 "탈퇴하기" 눌렀을 때 실행
  const handleFinalWithdraw = async (password: string) => {
    setIsWithdrawLoading(true);
    try {
      const isVerified = await confirmPasswordAPI(password);

      if (!isVerified) {
        alert("비밀번호가 일치하지 않습니다.");
        setIsWithdrawLoading(false);
        return;
      }

      await withdrawAccount();
      localStorage.clear();
      alert("회원 탈퇴가 완료되었습니다.\n그동안 이용해 주셔서 감사합니다.");
      window.location.href = "/";

    } catch (error) {
      console.error("탈퇴 프로세스 실패:", error);
      alert("탈퇴 처리에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsWithdrawLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8 flex justify-center">
      {/* 탈퇴 모달 컴포넌트 */}
      <WithdrawModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleFinalWithdraw}
        isLoading={isWithdrawLoading}
      />

      <div className="max-w-3xl w-full flex flex-col gap-10">
        <div className="border-b border-gray-100 pb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            <span className="text-primary">{savedBasicData.userName}</span>님, 반갑습니다!
          </h1>
          <p className="text-gray-500 mt-2">서울집사에서 맞춤형 주거 지원 정보를 관리해보세요.</p>
        </div>

        <main className="space-y-12">
          {/* 1. 기본 정보 섹션 */}
          <MyPageBasicInfo
            isBasicEditing={isBasicEditing}
            setIsBasicEditing={setIsBasicEditing}
            savedBasicData={savedBasicData}
            basicFormData={basicFormData}
            handleBasicChange={handleBasicChange}
            handleBasicSubmit={(e) => handleBasicSubmit(e, () => window.location.reload())}
            cancelBasicEdit={cancelBasicEdit}
          />

          {/* 2. 추가 정보 섹션 */}
          <MyPageAddInfo
            isAddInfoEditing={isAddInfoEditing}
            setIsAddInfoEditing={setIsAddInfoEditing}
            isLoading={isLoading}
            addInfoFormData={addInfoFormData}
            savedData={savedData}
            handleAddInfoChange={handleAddInfoChange}
            handleAddInfoSubmit={handleAddInfoSubmit}
          />

          {/* 3. 하단 위험 구역 (탈퇴 버튼) */}
          <div className="pt-8 flex justify-center border-t border-gray-100">
            <button
              onClick={handleWithdrawClick}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-red-500 transition-colors px-4 py-2"
            >
              회원 탈퇴를 원하시나요?
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
