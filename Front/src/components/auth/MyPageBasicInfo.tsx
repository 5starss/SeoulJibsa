import type { BasicFormState } from "../../pages/hooks/useMyPage";

interface MyPageBasicInfoProps {
    isBasicEditing: boolean;
    setIsBasicEditing: (val: boolean) => void;
    savedBasicData: BasicFormState;
    basicFormData: BasicFormState;
    handleBasicChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBasicSubmit: (e: React.FormEvent) => void;
    cancelBasicEdit: () => void;
}

export default function MyPageBasicInfo({
    isBasicEditing,
    setIsBasicEditing,
    savedBasicData,
    basicFormData,
    handleBasicChange,
    handleBasicSubmit,
    cancelBasicEdit,
}: MyPageBasicInfoProps) {
    return (
        <section className="bg-white rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-50 flex justify-between items-center bg-gradient-to-r from-primary/5 to-transparent">
                <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">badge</span>
                    기본 계정 정보
                </h2>
                <button
                    onClick={() => setIsBasicEditing(true)}
                    className={[
                        "px-4 py-1.5 rounded-full text-sm font-semibold transition-all shadow-sm",
                        isBasicEditing
                            ? "invisible pointer-events-none"
                            : "bg-white border border-gray-200 text-gray-600 hover:border-primary hover:text-primary",
                    ].join(" ")}
                >
                    수정
                </button>
            </div>

            <div className="p-6 sm:p-8">
                {isBasicEditing ? (
                    <form onSubmit={handleBasicSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-down">
                        {savedBasicData.authType && savedBasicData.authType !== "LOCAL" && (
                            <div className="col-span-1 md:col-span-2 p-4 bg-orange-50/50 rounded-xl border border-orange-100 flex items-start gap-3">
                                <span className="material-symbols-outlined text-orange-500 mt-0.5">info</span>
                                <p className="text-sm text-orange-700 leading-relaxed">
                                    <strong>소셜 로그인(카카오/네이버 등)</strong> 사용자는 이메일을 변경할 수 없습니다.<br />
                                    정보 변경이 필요한 경우 해당 소셜 서비스에서 수정해주세요.
                                </p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">이름</label>
                            <input
                                type="text"
                                name="userName"
                                value={basicFormData.userName}
                                onChange={handleBasicChange}
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none text-gray-900"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">아이디</label>
                            <input
                                type="text"
                                value={basicFormData.loginId}
                                disabled
                                className="w-full px-4 py-3.5 rounded-xl bg-gray-100 border border-transparent text-gray-500 cursor-not-allowed outline-none"
                            />
                        </div>
                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700">이메일</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    name="email"
                                    value={basicFormData.email}
                                    onChange={handleBasicChange}
                                    disabled={!!savedBasicData.authType && savedBasicData.authType !== "LOCAL"}
                                    className={`w-full px-4 py-3.5 rounded-xl border border-transparent transition-all outline-none
                    ${savedBasicData.authType && savedBasicData.authType !== "LOCAL"
                                            ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                                            : "bg-gray-50 text-gray-900 focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10"
                                        }
                  `}
                                />
                                {savedBasicData.authType && savedBasicData.authType !== "LOCAL" && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <span className="material-symbols-outlined text-sm">lock</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex gap-3 mt-4 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={cancelBasicEdit}
                                className="flex-1 py-3.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
                            >
                                변경사항 저장
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in-up">
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">person</span>이름
                            </span>
                            <span className="text-lg font-bold text-gray-900">{savedBasicData.userName}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">id_card</span>아이디
                            </span>
                            <span className="text-lg font-bold text-gray-900">{savedBasicData.loginId}</span>
                        </div>

                        <div className="col-span-1 md:col-span-2 p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">mail</span>이메일
                            </span>
                            <div className="flex items-center gap-2">
                                <span className="text-lg font-bold text-gray-900">{savedBasicData.email}</span>
                                {savedBasicData.authType && savedBasicData.authType !== "LOCAL" && (
                                    <span className="px-2 py-0.5 rounded-md bg-yellow-100 text-yellow-700 text-xs font-bold border border-yellow-200">
                                        Social
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
