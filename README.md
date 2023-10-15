# Second Hand : Frontend Development

- 중고 거래 서비스 웹 구현 프로젝트 Frontend 섹션
- [Team GitHub Repository](https://github.com/masters2023-2nd-project-03/second-hand)

<br>

## 목차

- [프로젝트 소개](#프로젝트-소개-)
- [기능 소개](#기능-소개-)
- [트러블 슈팅](#트러블-슈팅-%EF%B8%8F)
- [팀 소개](#팀-소개-)

<br>

## 프로젝트 소개 👋

```
🎯 기획서와 디자인에서 요구하는 중고 거래 서비스 웹을 구현하는 프로젝트 입니다.
```

- 팀 구성 : FE 2명, BE 2명, iOS 2명
- 개발 기간 : 2023.06 ~ 2023.08 (10주)
- 나의 작업 기여도 : 88% (FE 77개의 PR중 68개를 담당)
- 기술 스택 : React, TypeScript, styled-components

<br>

## 기능 소개 🔍

<details>
  <summary>1. 홈</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/133c57fc-13a3-4284-818f-227279aab471/image.png" width="70%">
</details>

<details>
  <summary>2. 로그인</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/3b67d83b-fbd4-446b-a75d-acf78ee5a6ab/image.png" width="70%">
</details>

<details>
  <summary>3. 동네 설정</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/6614e3a6-d796-436e-bd23-06ffc02e462a/image.png" width="70%">
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/8581ea3b-7c01-49bf-8fd6-ff3203ccc03b/image.png" width="70%">
</details>

<details>
  <summary>4. 카테고리</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/c2b8a938-2a5f-4702-88a7-a849b6cb925e/image.png" width="70%">
</details>

<details>
  <summary>5. 상품 등록</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/de909834-d783-45ae-b764-867cc6646327/image.png" width="70%">
</details>

<details>
  <summary>6. 상품 확인</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/c650477b-ce58-4a04-aca0-ff948f5ea92d/image.png" width="70%">
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/64a51fec-09e1-4906-a23f-41e1a115d9df/image.png" width="70%">
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/09ed0872-ce48-4107-9ff8-1591abd416dd/image.png" width="70%">
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/b2707cf4-f4f5-400d-a6a8-eeb1a2b76210/image.png" width="70%">
</details>

<details>
  <summary>7. 판매 내역</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/9ae69d9e-cd84-48c1-aa5f-2425f8351799/image.png" width="70%">
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/e2bb3951-8e43-4462-ab3b-5da8e1f8f5e3/image.png" width="70%">
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/ee05ae7a-fdf3-4418-b000-5e490ea6b7c3/image.png" width="70%">
</details>

<details>
  <summary>8. 관심 상품</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/2e94c77a-ccea-44de-88f2-190b7e817f0b/image.png" width="70%">
</details>

<details>
  <summary>9. 채팅</summary>
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/f736c830-bc88-46f5-95da-2230ebc16124/image.png" width="70%">
</details>

<br>

## 트러블 슈팅 🛠️

<details>
  <summary>Trouble 1 : 이미지 재업로드 실패 문제</summary>

## 👿 Problem

- 첨부 이미지를 삭제 후 동일 이미지를 다시 첨부하면 동작되지 않는 문제가 발생

  <img src="https://velog.velcdn.com/images/sarang_daddy/post/69b1ce5a-0be1-41bd-8e10-ace05fae47fc/image.gif" width="30%">

## 🧐 원인 파악

- input 태그를 통해 파일을 입력받을 때 onChange 이벤트를 통해 받게 된다.
- onChange는 실질적인 데이터가 바뀔때만 반응하므로 기존의 파일을 다시 업로드하면 작동하지 않는다.
- 때문에, onChange 이벤트를 통해 데이터를 등록 후, value 값을 reset 해주어야 한다.

## 😋 Solution

- event.target.value값을 reset 하여 문제 해결

  ```tsx
  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // 중략

    event.target.value = "";
  };
  ```

</details>

<details>
  <summary>Trouble 2 : 동일 이미지의 중복 업로드 문제</summary>

## 👿 Problem

- 동일한 이미지 파일이 업로드 되는 문제 발생

  <img src="https://velog.velcdn.com/images/sarang_daddy/post/aa374c64-e1dd-481c-b0b4-3e703d04b868/image.gif" width="30%">

## 🧐 원인 파악

- Trouble 1의 문제 해결 단계에서 업로드 데이터 값을 초기화 했기 때문에 중복으로 업로드 되는 문제 발생

## 😋 Solution

- 동일한 데이터의 업로드를 막아주는 로직 추가가 필요
- 업로드 이미지는 `URL.createObjectURL()`값으로 등록되는데 reset으로 중복 처리에 사용 불가
- 동일한 이미지 파일인지 구분을 위해 file.name, file.size값을 적용

  ```tsx
  const handleUploadImage = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    // 중략

    // 동일한 이미지 파일인지 구분하기 위해 file.name, file.size 값 추가
    files.forEach((file) => {
      const imageUrl = URL.createObjectURL(file);
      const id = uuidv4();
      const fileName = file.name;
      const fileSize = file.size;

      // 중복 체크 로직 추가
      const isDuplicate = uploadedImages.some(
        (image) => image.fileName === file.name && image.fileSize === file.size
      );

      if (!isDuplicate) {
        const newUploadedImage: UploadedImageType = {
          id,
          imageUrl,
          fileName,
          fileSize,
        };

        setUploadedImages((prevImages) => [...prevImages, newUploadedImage]);
      }
    });
    event.target.value = "";
  };
  ```

</details>

<details>
  <summary>Trouble 3 : 페이지 전환 시 작성 중인 데이터 손실 문제</summary>

## 👿 Problem

- 상품 등록 페이지에서 다른 페이지로 이동 후 돌아오면 작성했던 내용이 모두 사라지는 문제가 발생

  <img src="https://velog.velcdn.com/images/sarang_daddy/post/ab2762b1-ee48-458e-bee1-d8112836b4a9/image.gif" width="30%">

## 🧐 원인 파악

- React는 페이지 이동시 현재 페이지의 컴포넌트가 언마운트 되고, 새로운 페이지의 컴포넌트가 마운트 된다.
- 언마운트 과정에서 컴포넌트의 상태는 메모리에서 해제된다.
- 다시 이전 페이지로 돌아오더라도 해당 페이지의 컴포넌트는 다시 마운트 되기에 초기상태로 시작된다.

## 😋 Solution

- 본 프로젝트에서는 전역 상태 관리 라이브러리를 사용하지 않고 있기에 언마운트 때 해제되는 상태를 보존하기 위해서는 `로컬스토리지`나 `세션스토리지` 같은 클라이언트 측 저장소를 사용해야 한다.
- 브라우저를 실수로 닫아도 데이터가 유지될 수 있도록 로컬스토리지를 활용해서 해결해보자.

### 로컬스토리지 데이터 불러오기

- 상품 등록 최상위 컴포넌트에서 상태(postObject)를 관리한다.
- 마운트 되었을때 로컬스토리지에 저장된 값이 존재한다면 불러온다.

  ```tsx
  const storedPostObject = localStorage.getItem("postObject");

  // 최상위 컴포넌트에서 관리되고 있는 상태 postObject
  const [postObject, setPostObject] = useState<PostObjectType>(
    storedPostObject ? JSON.parse(storedPostObject) : initialPostObject
  );
  ```

- 상품 등록이 완료된다면 로컬스토리지에 저장된 값을 제거해야한다.

  ```tsx
  const handleUploadComplete = async () => {
    // 중략

    await postProducts(formData, accessToken);
    localStorage.removeItem("postObject");
    navigation(-1);
  };
  ```

### 로컬스토리지에 데이터 저장하기

- 상품등록 컴포넌트가 언마운트 되더라도 로컬스토리지에 데이터 값을 저장하여 보존할 수 있다.
- 하위 컴포넌트들에서 입력되는 데이터값들을 로컬스토리지에 저장 해준다.

  ```tsx
  const { title, price, content, categoryId, locationId, files } = postObject;

  useEffect(() => {
    const postObjectToStore = {
      title,
      price,
      content,
      categoryId,
      locationId,
      files,
    };
    localStorage.setItem("postObject", JSON.stringify(postObjectToStore));
  }, [title, price, content, categoryId, locationId, files]);
  ```

### 해결 UI

<img src="https://velog.velcdn.com/images/sarang_daddy/post/17440c5e-cd36-40b5-81ac-2d2b66f43325/image.gif" width="30%">

</details>

<details>
  <summary>Trouble 4 : 이중 렌더링 문제</summary>

## 👿 Problem

- 상품등록의 자식컴포넌트들에서 두번의 리렌더링이 발생되고 있다. (`strict mode` 활성화 중)

  <img src="https://velog.velcdn.com/images/sarang_daddy/post/26b2bbad-eb84-4424-ac02-267ef7795c81/image.png" width="70%">

## 🧐 원인 파악

- Trouble 3과 이어지는 과정으로 상품등록의 입력 컴포넌트들(자식)은 postObject를 전달 받고 있다.
- postObject에 존재하는 데이터가 있다면 초기값으로 셋팅하기 위해 useEffect를 사용함이 원인이다.

  ```tsx
  const { postObject, setPostObject } = useContext(postSalesItemContext);
  const [inputComment, setInputComment] = useState<string | null>(null);

  useEffect(() => {
    if (postObject.content) {
      const storedContent = postObject.content;
      setInputComment(storedContent);
    }
  }, []);
  ```

- 사용자 입력으로 postObject가 변경되면 부모 컴포넌트로 부터 변경된 props가 전달되면서 렌더링이 일어난다. (1번)
- 렌더링 후 useEffect가 호출되면서 렌더링이 일어난다. (2번)
- 보존 데이터를 업데이트 하기 위한 용도로 useEffect를 사용한 문제다.

## 😋 Solution

- **렌더링을 위해 데이터를 변환하는 경우 useEffect는 필요하지 않다.**
- 부모 컴포넌트로부터 전달 받은 props를 자식 컴포넌트 초기값으로 설정한다.
  ```tsx
  const [inputComment, setInputComment] = useState<string | null>(
    postObject.content ? postObject.content : null
  );
  ```
- 부모 컴포넌트에서 localStorage에 값을 보존하기 위한 useEffect를 제외한 모든 자식 컴포넌트들의 useEffect를 제거한다.
- 두 번씩 일어나던 렌더링 해결.

  <img src="https://velog.velcdn.com/images/sarang_daddy/post/c2ee1195-cf97-4bf3-9051-786d2f2e5b3b/image.png" width="70%">

- 수정 내용 성능 테스트 결과 사용자가 체감 하기에는 미비한 수치지만 개선됨을 확인할 수 있다.

  <img src="https://velog.velcdn.com/images/sarang_daddy/post/56e2e929-767a-4716-81a4-a2ca1eaa7be4/image.png" width="70%">

</details>

<details>
  <summary>Trouble 5 : 변경 없음에도 useEffect 호출 문제</summary>

## 👿 Problem

- 변경내용이 없는 경우에도 useEffect가 호출되는 문제 발견

  ![](https://velog.velcdn.com/images/sarang_daddy/post/fff0682d-753b-484d-abc1-1e672268a308/image.gif)

## 🧐 원인 파악

- 의존성 배열에 객체를 두었기 때문에 발생하는 문제
- **자바스크립트의 객체는 평가될 때마다 새로운 객체를 생성한다.**
  ```tsx
  useEffect(() => {
    const postObjectToStore = { ...postObject };
    localStorage.setItem("postObject", JSON.stringify(postObjectToStore));
    console.log("변경사항 렌더링 체크");
  }, [postObject]);
  ```

## 😋 Solution

- 의존성 배열에서 객체를 제거한다.
- useEffect 외부에서 `객체의 원시값`을 읽어준다.
- useEffect 의존성 배열에서 `원시값`을 비교한다.

  ```tsx
  const { title, price, content, categoryId, locationId, files } = postObject;

  useEffect(() => {
    const postObjectToStore = {
      title,
      price,
      content,
      categoryId,
      locationId,
      files,
    };
    localStorage.setItem("postObject", JSON.stringify(postObjectToStore));
    console.log("렌더링 체크");
  }, [title, price, content, categoryId, locationId, files]);
  ```

</details>
<details>
  <summary>Trouble 6 : 동일 사용자 로그인의 일관되지 않은 성공/실패 문제</summary>

## Trouble 6: 동일 사용자 로그인 시도에 대한 불일치 문제

## 👿 Problem

- 동일한 사용자로 로그인을 시도하면 성공하는 경우도 있고 실패하는 경우도 발생

  <img src="https://velog.velcdn.com/images/sarang_daddy/post/56a2870a-b1c4-4020-843d-7ac41f05f81a/image.gif" width="30%">

## 🧐 원인 파악

- 개발자 도구 네트워크를 확인하니 로그인 요청이 **_두 번_** 발생하고 있다.
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/b03a7797-d7e4-41ba-80a6-19b78349b016/image.png" width="70%">
- 요청이 두 번 발생하기에 잘못된 인증코드가 서버로 가는 경우가 발생
- `엄격모드`는 컴포넌트의 부수효과를 두 번 호출한다.
- 이는 상용 환경에서는 발생하지 않는 문제이지만, 엄격모드를 제거한다면 개발 단계에서 잠재적 문제를 발견하기 어렵다.
- useEffect에 `클립업` 함수를 추가해서 두 번째 요청을 무시하도록 해야한다.

## 😋 Solution

### 로그인 로직 점검

#### 1. 사용자에게 GitHub 로그인을 제안

- 웹에서 "GitHub으로 로그인" 버튼 제공
- 사용자 로그인 버튼 클릭

#### 2. 사용자를 GitHub 인증 페이지로 리다이렉트

- GitHub의 OAuth 인증 페이지로 리다이렉트

#### 3. 사용자 인증 및 권한 부여

- 사용자는 GitHub에 로그인하고 애플리케이션에 필요한 권한 부여

#### 4. GitHub에서 웹으로 리다이렉트

- 인증 및 권한 부여가 성공하면 GitHub는 사용자를 웹으로 다시 리다이렉트
- **_인증 코드(AUTHORIZATION_CODE)가 URL의 쿼리 파라미터로 전달_**

#### 5. 서버로 AUTHORIZATION_CODE와 함께 로그인 요청

- 리다이렉트 되면서 클라이언트에서 서버측으로 AUTHORIZATION_CODE 코드와 함께 로그인 요청
- 서버는 AUTHORIZATION_CODE코드와 "client_secret"을 함께 GitHub OAuth 서버로 전송하여 액세스 토큰 획득

#### 6. 액세스 토큰을 이용하여 사용자 정보 조회

- 서버는 액세스 토큰을 이용하여 GitHub API를 통해 사용자 정보를 가져온다
- 사용자 정보가 "신규" 회원인지 "기존회원" 인지 서버에서 판단하고 클라이언트에게 응답

#### 7. 서버 응답으로 회원가입 or 로그인 진행

- 서버로 부터 "응답"과 함께 JWT을 받는다
- 응답이 "신규" 이면 JWT로 회원가입 진행
- 응답이 "기존회원" 결과를 받으면 JWT로 로그인 진행

### `[5번]` 서버로 로그인 요청에서 디버깅

```tsx
const Callback = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get(AUTHORIZATION_CODE);
  const { data } = useAsync(() => postLogin(code));
  const { handleLogin } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (data?.status === 'FORBIDDEN') {
      const { nickname, profileUrl, oauthId } = data.data;
      navigate(
        `${REGISTER}?nickname=${nickname}&profileUrl=${profileUrl}&oauthId=${oauthId}`,
      );
    }

    if (data?.status === 'OK') {
      const { jwt } = data.data;
      handleLogin(jwt);
      navigate(HOME);
    }
  }, [data]);

  return (
  // 중략
```

- `const { data } = useAsync(() => postLogin(code))`이 원인으로 판단

```tsx
function useAsync<T>(
 // 중략

  const fetchData = async (): Promise<void> => {
    dispatch({ type: 'LOADING' });
    try {
      const response: AxiosResponse<T> = await callback();
      dispatch({ type: 'SUCCESS', data: response.data });
    } catch (e) {
      dispatch({ type: 'ERROR', error: e as AxiosError });
    }
  };

  useEffect(() => {
    if (skip) return;
    fetchData();
  }, deps);

// 중략
}
```

- 두 번째 로그인 요청에서는 `fetchData()`가 호출되지 않도록 `클립업` 함수를 추가한다.

```tsx
let ignore = false;

useEffect(() => {
  if (skip) return;

  if (!ignore) {
    fetchData();
  }
  return () => {
    ignore = true;
  };
}, deps);
```

- `fetchData()`는 `ignore`이 false 인 경우(첫 요청)에만 호출된다.
- `엄격모드`로 useEffect가 재실행될 때는 `ignore`이 true가 되어 두 번째 `fetchData()`호출을 방지한다.
  <img src="https://velog.velcdn.com/images/sarang_daddy/post/0348f935-4a80-4e01-8fe2-59bb49235d46/image.png" width="70%">
- `엄격모드` 활성화 환경에서도 한 번의 요청만 처리되도록 수정하여 문제 해결

</details>

</br>

## 팀 소개 👨‍👨‍👦‍👦

|                                              노아[iOS]                                               |                                               에이든[iOS]                                               |                                               만쥬[BE]                                               |                                               시레[BE]                                               |                                               사랑대디[FE]                                                |                                               시저[FE]                                               |
| :--------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: | :-------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------: |
| <img src="https://avatars.githubusercontent.com/u/63908856?v=4" alt="워터" width="125" height="150"> | <img src="https://avatars.githubusercontent.com/u/115064144?v=4" alt="에이든" width="125" height="150"> | <img src="https://avatars.githubusercontent.com/u/20828490?v=4" alt="만쥬" width="125" height="150"> | <img src="https://avatars.githubusercontent.com/u/80495427?v=4" alt="시레" width="125" height="150"> | <img src="https://avatars.githubusercontent.com/u/109648042?v=4" alt="사랑대디" width="125" height="150"> | <img src="https://avatars.githubusercontent.com/u/76683390?v=4" alt="시저" width="125" height="150"> |
|                               [noah0316](https://github.com/noah0316)                                |                                   [wnsqhs](https://github.com/wnsqhs)                                   |                           [JeonHyoChang](https://github.com/JeonHyoChang)                            |                               [dltpwns0](https://github.com/dltpwns0)                                |                               [sarangdaddy](https://github.com/sarangdaddy)                               |                              [zlx454545](https://github.com/zlx454545)                               |

### 🤝 그라운드 룰

> 💡 우리팀의 가장 중요한 가치는?
> ☝️ 하나를 하더라도 확실히! ⇒ 근거있는 맛있는 코드
> ✌️ 적극적인 공유 및 협업 ⇒ 상황공유 및 일정공유 확/실히!

### ⏰ 시간 관련

---

- 데일리 스크럼 시작 시간은 **오전 10시 10분**
- 코어타임: **10시 10분 ~ 17시**
- **밤 시간에 슬랙을 통한 의사공유도 자유롭게!**
- 게더도입 고민!
- 지각비 3,000원
  - 서버 비를 우선으로 하되, 남는다면 회식 비로!

### 🔨 회의 룰

---

- 협업 포인트가 생긴다면, 오전 스크럼시간에 타 클래스와 함께 요청하기
- 긴급 요청의 경우 자유롭게 물어보기
- 만약 상대방이 빡 집중을 하고 있는 경우 한 템포 쉬고 물어보기

### 🎙️ 클래스 별 룰

---

- GitHub Orgazination [Wiki](https://github.com/masters2023-2nd-project-03/second-hand/wiki)에 정리하기
  - ex: ) 코딩 컨벤션, 커밋 가이드, 구조 가이드

### 🍽️ 식사 관련

---

- **매 주 금요일은 공간에서 같이 식사!**

### 👮‍♀️회고 관련

---

**KPT 회고 프레임 워크를 이용하여 매주 금요일 회고 시간에 회고 진행하기** **참고:**

- https://www.inflearn.com/pages/weekly-inflearn-41-20220215
- https://noah0316.github.io/Computer%20Science/2021-06-21-%EC%95%A0%EC%9E%90%EC%9D%BC-%EA%B0%9C%EB%B0%9C-%ED%94%84%EB%A1%9C%EC%84%B8%EC%8A%A4-%ED%86%BA%EC%95%84%EB%B3%B4%EA%B8%B0/

</p>
```
