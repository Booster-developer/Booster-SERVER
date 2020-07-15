module.exports = {
    NULL_VALUE: "필요한 값이 없습니다",
    OUT_OF_VALUE: "파라미터 값이 잘못되었습니다",

    // 회원가입
    CREATED_USER: "회원 가입 성공",
    DELETE_USER: "회원 탈퇴 성공",

    // ID 중복 확인
    VALID_ID: "사용 가능한 아이디입니다.",
    ALREADY_ID: "이미 사용 중인 아이디입니다.",
    
    // 로그인
    LOGIN_SUCCESS: "로그인 성공",
    LOGIN_FAIL: "로그인 실패",
    NO_USER: "존재하지 않는 회원입니다.",
    MISS_MATCH_PW: "비밀번호가 맞지 않습니다.",

    // 인증
    EMPTY_TOKEN: '토큰 값이 없습니다.',
    EXPIRED_TOKEN: '토큰 값이 만료되었습니다.',
    INVALID_TOKEN: '유효하지 않은 토큰값입니다.',
    AUTH_SUCCESS: '인증에 성공했습니다.',
    ISSUE_SUCCESS: '새로운 토큰이 생성되었습니다.',

    // 매장 관련
    READ_STORE_LIST_SUCCESS: '매장 리스트 가져오기 성공',
    READ_UNIV_LIST_SUCCESS: '대학교 리스트 가져오기 성공',
    READ_STORE_DETAIL_SUCCESS: '매장 상세 페이 가져오기 성공',
    REGISTER_STORE_FAVORITE_SUCCESS: '매장 즐겨찾기 등록 성공',
    CANCLE_STORE_FAVORITE_SUCCESS: '매장 즐겨찾기 해지 성공',
    ALREADY_REGISTERED_STORE_FAVORITE: '이미 즐겨찾기 등록된 매장입니다.',
    READ_ORDER_TAB_STORE_LIST_SUCCESS:'주문 탭 매장 선택 리스트 성공',

    // 주문 관련
    REGISTER_STORE_ORDER_SUCCESS:'매장 주문 등록 성공',
    REGISTER_FILE_ORDER_SUCCESS:'매장, 파일 주문 등록 성공',
    REGISTER_OPTIONS_ORDER_SUCCESS:'옵션 선택 주문 성공',
    REGISTER_ORDER_REQUEST_SUCCESS:'주문 요청사항 등록 성공',
    READ_WAITING_LIST_SUCCESS: '대기하기 리스트 가져오기 성공',
    READ_PAYMENT_INFO_SUCCESS: '결제 진행 정보 가져오기 성공',
    DELETE_FILE_SUCCESS: '주문 파일 삭제 성공',
    READ_PROGRESS_LIST_SUCCESS: '주문 현황 리스트 가져오기 성공',
    READ_PROGRESS_DETAIL_LIST_SUCCESS: '주문 현황 상세 리스트 가져오기 성공',
    REGISTER_PICKUP_SUCCESS: '픽업 완료 처리 성공',
    DELETE_ORDER_SUCCESS: '주문 취소 성공',

    // 홈 관련
    READ_SUMMARY_INFO_SUCCESS: '주문 현황 요약 정보 가져오기 성공',
    UNSUPPORTED_TYPE: '지원하지 않는 확장자입니다',

    // 마이 페이지 관련
    READ_PROFILE_SUCCESS: '내 프로필 가져오기 성공',
    UPDATE_PROFILE_SUCCESS: '프로필 수정 성공',
    READ_ENGINE_HISTORY_SUCCESS: '나의 엔진 사용 내역 가져오기 성공',
    READ_NOTICE_HISTORY_SUCCESS: '알림 내역 가져오기 성공',
    UPDATE_NOTICE_CONFIRM_SUCCESS: '알림 내역 확인 처리 성공',

    DB_ERROR: 'DB 오류'
};
