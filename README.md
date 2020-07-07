# 🚀We are BOOSTER SERVER🚀


## BOOSTER - 빠르게 출력하는 편리함

> SOPT 26기 Appjam '부스터'
>
> Faster / Easier / Together
>
> 프로젝트 기간 2020.07 ~ 진행중

## 📈 Workflow

<img src="https://user-images.githubusercontent.com/45157374/86798602-eb6dbe80-c0ab-11ea-86cb-23cc73b472c1.png" width="80%"></img>

## 🤙 Code Convention
* camelcase 사용(단, DB 관련 내용은 snakecase 사용)

* var 보다는 let,const 사용

* 조건문, 반복문 등 중괄호는 같은 라인에 사용

* 가급적 큰 따옴표(")보단 작은 따옴표(') 사용

* git branch
```json
dev
|
|-- dev_de
|
|-- dev_mh
```

* git commit message 
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

## 📍 ERDiagram

<img src="https://github.com/Booster-developer/Booster-SERVER/blob/dev/images/Booster_ERD.png" width="80%"/>

## 🗂 dependencies module(package.json)

```json
"dependencies": {
    "aws-sdk": "^2.709.0",
    "cookie-parser": "~1.4.4",
    "debug": "~2.6.9",
    "ejs": "~2.6.1",
    "express": "~4.16.1",
    "http-errors": "~1.6.3",
    "jsonwebtoken": "^8.5.1",
    "moment": "^2.27.0",
    "morgan": "~1.9.1",
    "multer": "^1.4.2",
    "multer-s3": "^2.9.0",
    "nodemon": "^2.0.4",
    "promise-mysql": "^4.1.3",
    "python-shell": "^2.0.1",
    "rand-token": "^1.0.1"
  }
```

## 🔆 Team Role

* 심다은
  * DB 설계
  
* 천명희
  * DB 설계

## 🛠 기능 명세서 및 역할 분담

<img src="https://github.com/Booster-developer/Booster-SERVER/blob/dev/images/%EA%B8%B0%EB%8A%A5%EB%AA%85%EC%84%B8%EC%84%9C_%EB%B0%8F_%EC%97%AD%ED%95%A0%EB%B6%84%EB%8B%B4.png"/>



## 👩‍💻 Developer

* [심다은](https://github.com/DaEunShim)
* [천명희](https://github.com/Haeeul)
