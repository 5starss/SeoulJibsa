import type { AddInfoFormState } from "../../pages/hooks/useMyPage";
import type { UserAddInfo } from "../../types/user";

interface MyPageAddInfoProps {
    isAddInfoEditing: boolean;
    setIsAddInfoEditing: (val: boolean) => void;
    isLoading: boolean;
    addInfoFormData: AddInfoFormState;
    savedData: UserAddInfo;
    handleAddInfoChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
    handleAddInfoSubmit: (e: React.FormEvent) => void;
}

export default function MyPageAddInfo({
    isAddInfoEditing,
    setIsAddInfoEditing,
    isLoading,
    addInfoFormData,
    savedData,
    handleAddInfoChange,
    handleAddInfoSubmit,
}: MyPageAddInfoProps) {

    // 화면 출력용 유틸 함수
    const getDisplayValue = (key: string, value: string | number | boolean | null) => {
        if (value === null || value === "") return <span className="text-gray-300 font-normal">미입력</span>;
        if (key === "targetType") {
            if (value === "STUDENT") return "대학생";
            if (value === "YOUTH") return "청년";
            if (value === "NEWLYWED") return "신혼부부";
            return value;
        }
        if (key === "marriageStatus") {
            if (value === "SINGLE") return "미혼";
            if (value === "MARRIED") return "기혼";
            return "결혼 예정";
        }
        if (key === "houseOwn") {
            if (value === "YES") return "보유";
            if (value === "NO") return "미보유";
            return value;
        }
        if (key === "childCount") return `${value}명`;
        if (key === "asset" || key === "income") return `${Number(value).toLocaleString()}만원`;

        return value;
    };

    return (
        <section className="bg-white rounded-3xl shadow-[0_2px_20px_rgb(0,0,0,0.03)] border border-gray-100 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-gray-50 flex justify-between items-center bg-gradient-to-r from-primary/5 to-transparent">
                <div>
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">edit_document</span>
                        맞춤형 정보
                    </h2>
                    <p className="text-xs text-gray-500 mt-1 ml-7">청약 및 지원 공고 추천을 위한 정보입니다.</p>
                </div>
                {!isAddInfoEditing && (
                    <button
                        onClick={() => setIsAddInfoEditing(true)}
                        className="px-4 py-1.5 bg-white border border-gray-200 text-gray-600 rounded-full text-sm font-semibold hover:border-primary hover:text-primary transition-all shadow-sm"
                    >
                        수정
                    </button>
                )}
            </div>

            <div className="p-6 sm:p-8">
                {isAddInfoEditing ? (
                    <form onSubmit={handleAddInfoSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-down">
                        <div className="col-span-1 md:col-span-2 p-4 bg-blue-50/50 rounded-xl border border-blue-100 flex items-start gap-3 mb-2">
                            <span className="material-symbols-outlined text-blue-500 mt-0.5">info</span>
                            <p className="text-sm text-blue-600 leading-relaxed">
                                입력하지 않은 항목은 <strong>'정보 없음'</strong>으로 처리되어 추천 정확도가 낮아질 수 있습니다.<br />
                                가능한 정확한 정보를 입력해주세요.
                            </p>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">생년월일</label>
                            <input type="date" name="birthDate" value={addInfoFormData.birthDate} onChange={handleAddInfoChange} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">대상 유형</label>
                            <div className="relative">
                                <select name="targetType" value={addInfoFormData.targetType} onChange={handleAddInfoChange} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none cursor-pointer">
                                    <option value="">선택 안 함</option>
                                    <option value="STUDENT">대학생</option>
                                    <option value="YOUTH">청년</option>
                                    <option value="NEWLYWED">신혼부부</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">혼인 상태</label>
                            <div className="relative">
                                <select name="marriageStatus" value={addInfoFormData.marriageStatus} onChange={handleAddInfoChange} className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none appearance-none cursor-pointer">
                                    <option value="">선택 안 함</option>
                                    <option value="SINGLE">미혼</option>
                                    <option value="MARRIED">기혼</option>
                                    <option value="PLANNED">결혼 예정</option>
                                </select>
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-gray-400 pointer-events-none">expand_more</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">자녀 수</label>
                            <div className="relative">
                                <input type="number" name="childCount" value={addInfoFormData.childCount} onChange={handleAddInfoChange} placeholder="0" min="0" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">명</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">총 자산</label>
                            <div className="relative">
                                <input type="text" name="asset" value={addInfoFormData.asset} onChange={handleAddInfoChange} placeholder="0" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">만원</span>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-700">월 소득</label>
                            <div className="relative">
                                <input type="text" name="income" value={addInfoFormData.income} onChange={handleAddInfoChange} placeholder="0" className="w-full px-4 py-3.5 rounded-xl bg-gray-50 border border-transparent focus:bg-white focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all outline-none" />
                                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">만원</span>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 space-y-2">
                            <label className="text-sm font-semibold text-gray-700">주택 보유 여부</label>
                            <div className="flex gap-4">
                                <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${addInfoFormData.houseOwn === 'NO' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                    <input type="radio" name="houseOwn" value="NO" checked={addInfoFormData.houseOwn === "NO"} onChange={handleAddInfoChange} className="hidden" />
                                    <span className="material-symbols-outlined">check_circle</span>
                                    미보유 (무주택)
                                </label>
                                <label className={`flex-1 flex items-center justify-center gap-2 p-4 rounded-xl border cursor-pointer transition-all ${addInfoFormData.houseOwn === 'YES' ? 'bg-primary/5 border-primary text-primary font-bold' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                                    <input type="radio" name="houseOwn" value="YES" checked={addInfoFormData.houseOwn === "YES"} onChange={handleAddInfoChange} className="hidden" />
                                    <span className="material-symbols-outlined">home</span>
                                    보유
                                </label>
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-2 flex gap-3 mt-6 pt-6 border-t border-gray-100">
                            <button type="button" onClick={() => setIsAddInfoEditing(false)} className="flex-1 py-3.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 transition-colors">취소</button>
                            <button type="submit" disabled={isLoading} className="flex-[2] py-3.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all disabled:opacity-50">
                                {isLoading ? "저장 중..." : "정보 수정 완료"}
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6 animate-fade-in-up">
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">calendar_month</span>생년월일</span>
                            <span className="text-lg font-bold text-gray-900">{getDisplayValue("birthDate", savedData.birthDate)}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">face</span>대상 유형</span>
                            <span className="text-lg font-bold text-gray-900">{getDisplayValue("targetType", savedData.targetType)}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">diversity_3</span>혼인 상태</span>
                            <span className="text-lg font-bold text-gray-900">{getDisplayValue("marriageStatus", savedData.marriageStatus)}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">child_care</span>자녀 수</span>
                            <span className="text-lg font-bold text-gray-900">{getDisplayValue("childCount", savedData.childCount)}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">account_balance_wallet</span>총 자산</span>
                            <span className="text-lg font-bold text-gray-900">{getDisplayValue("asset", savedData.asset)}</span>
                        </div>
                        <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 flex flex-col gap-1">
                            <span className="text-xs text-gray-500 font-medium flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">attach_money</span>월 소득</span>
                            <span className="text-lg font-bold text-gray-900">{getDisplayValue("income", savedData.income)}</span>
                        </div>

                        <div className="col-span-2 md:col-span-3 p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-primary/20 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm border border-primary/20">
                                    <span className="material-symbols-outlined">home</span>
                                </div>
                                <div>
                                    <p className="text-xs text-primary font-bold mb-0.5 uppercase tracking-wide">Housing Status</p>
                                    <p className="text-green-900 font-bold text-lg">주택 보유 여부</p>
                                </div>
                            </div>
                            <div className="px-5 py-2 bg-white rounded-xl shadow-sm border border-primary/20 text-primary font-bold">
                                {getDisplayValue("houseOwn", savedData.houseOwn)}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
