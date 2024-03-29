# 🚀We are BOOSTER SERVER🚀

## BOOSTER - 빠르게 출력하는 편리함

> SOPT 26기 Appjam '부스터'
>
> Faster / Easier / Together
>
> 프로젝트 기간 2020.07 ~ 진행중

## 📈 Workflow

<img src="https://user-images.githubusercontent.com/46866476/87736308-bcc1b780-c812-11ea-855c-b9306a894200.jpeg" ></img>


## [✔️ API Docs 바로가기](https://github.com/Booster-developer/Booster-SERVER/wiki)
<br>

## ✔️ SERVER ARCHITECTURE
<img src="https://user-images.githubusercontent.com/46866476/87781826-62554500-c86c-11ea-9c23-55442ba8a31b.png"/>
<br>

## ✔️ Code Convention
* camelcase 사용(단, DB 관련 내용은 snakecase 사용)

* var 보다는 let,const 사용

* 조건문, 반복문 등 중괄호는 같은 라인에 사용

* 가급적 큰 따옴표(")보단 작은 따옴표(') 사용

* **git branch**
```json
dev
|
|-- dev_de
|
|-- dev_mh
```

* **git commit message**
```json
- 기능(feat): 새로운 기능을 추가
- 버그(fix): 버그 수정
- 리팩토링(refactor): 코드 리팩토링
- 형식(style): 코드 형식, 정렬, 주석 등의 변경(동작에 영향을 주는 코드 변경 없음)

- 테스트(test): 테스트 추가, 테스트 리팩토링(제품 코드 수정 없음, 테스트 코드에 관련된 모든 변경에 해당)
- 문서(docs): 문서 수정(제품 코드 수정 없음)
- 기타(chore): 빌드 업무 수정, 패키지 매니저 설정 등 위에 해당되지 않는 모든 변경(제품 코드 수정 없음)

ex. feat [GET] /test
      docs README
```
<br>



## ✔️ ERDiagram

<img src="https://user-images.githubusercontent.com/46866476/87725895-0dc4b200-c7f9-11ea-8c39-60051d0ffdae.png" width="80%"/>
<br>




## ✔️ dependencies module(package.json)
<img src="https://user-images.githubusercontent.com/46866476/87726428-f1754500-c7f9-11ea-8d06-bc66b4a46341.png" width="80%">


<br>



## ✔️ Team Role

* **심다은**
  * DB 설계
  * 매장
    * 매장 리스트(정렬: 운영 즐겨찾기 - 운영 일반 - 미운영 즐겨찾기 - 미운영 일반)
    * 대학교 리스트 
    * 매장 상세 페이지 
    * 즐겨찾기 등록 및 해지
  * 주문
    * 매장 정보 주문
    * 파일 정보 주문
    * 옵션 선택 주문
    * 대기하기 리스트
    * 팝업 옵션 정보 
    * 결제 진행 정보
    * 주문 요청사항, 시간 등록
    * 주문 파일 삭제
  * 주문하기(바로가기 탭)
    * 주문 탭 매장 선택 리스트 
  * 파이썬을 이용하여 pdf파일 전체 페이지 수 반환
  * 사장님 전용 웹사이트
    * Front-End
    * Back-End
  
* **천명희**
  * DB 설계
  * 로그인
    * 아이디 중복 확인
    * 회원가입
    * 로그인
  * 홈
    * 주문 현황 요약 정보
  * 주문현황
    * 주문 현황 리스트(가동 부스터 개수 포함)
    * 주문 현황 상세 리스트
    * 주문 취소
    * 픽업 완료 처리
  * 마이페이지
    * 내 프로필 정보 조회
    * 비밀번호 확인
    * 프로필 수정
    * 나의 엔진 사용 내역
    * 알림 내역
    * 알림 내역 확인 처리
  
<br>
  
  
  
  
## ✔️ Main Function

* **매장 찾아보기(리스트,지도)**

  * 사용자가 설정한 대학교를 기준으로 가까운 인쇄소 위치를 안내하고, 해당 매장의 인쇄정보를 제공합니다.
  * 원하는 매장을 즐겨찾기에 등록하고, 빠른 주문하기가 가능합니다.
  * 운영 시간에 따른 현재 운영 매장을 상단에 보여줍니다.

* **주문하기**

  * 원하는 매장에 여러 파일을 주문할 수 있습니다.
  * 각 파일 별로 옵션 적용이 가능합니다.
  * 옵션 선택에 따라 가격 정보를 계산 해줍니다.
  * pdf 파일의 페이지 수를 반환하여 '전체 페이지 인쇄'를 할 수 있습니다.(python3 사용 - pdftotext library 사용)

* **주문현황**

  * 사용자가 주문한 인쇄 현황을 프로세스 바를 통해 한눈에 살펴 볼 수 있습니다.
<br>

## ✔️ 사장님 전용 웹페이지
<img src="https://user-images.githubusercontent.com/46866476/87728510-2aafb400-c7fe-11ea-99dd-1f509adc59a3.png"/>
<br>


## ✔️ 기능 명세서 및 역할 분담

<img src="https://user-images.githubusercontent.com/46866476/87728169-72820b80-c7fd-11ea-9115-9254576fb952.png"/>





## ✔️ Developer

* [심다은](https://github.com/DaEunShim)
* [천명희](https://github.com/Haeeul)
