import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import "../styles/MainPage.css"; // CSS 파일 가져오기

const MainPage = () => {
  const navigate = useNavigate();
  const [animateHeading, setAnimateHeading] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false); // 첫 방문 여부 상태
  const [animateButtons, setAnimateButtons] = useState(false);
  const [animateDescription, setAnimateDescription] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("mainpageVisited");
    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem("mainpageVisited", 'true');
    } else {
      setAnimateHeading(true);
      setAnimateDescription(true);
      setAnimateButtons(true);
    }
    if (!hasVisited) {
      setTimeout(() => setAnimateHeading(true), 0);
      setTimeout(() => setAnimateDescription(true), 2000);
      setTimeout(() => setAnimateButtons(true), 3000);
    }

  }, []);
  return (
    <div>
      <main className="mmain">
      <div className={`heading-box ${animateHeading ? "animate" : ""}`}>
        <div>
        <h1 className="hheading">뭐, 대충 해줄 테니까 감성 그런 거 기대하지 마</h1>
          <p className={`description ${animateDescription ? "animate" : ""}`}>
            세상은 감성이 넘치고, 사람들은 아름다운 말을 주고받는다. 하지만 어디선가 누군가는 고민한다.
            <br />
            "편지? 그게 뭐지? 함수 그래프 같은 거야?"
            <br />
            걱정 마라, 감성이 부족한 공학도여.
             우리에겐 <strong>니편대써</strong>가 있으니까!
            <br />
            편지지를 고르고, 몇 마디만 입력해라.
            <br />
            그리고 나머지는 대충 써준다.
            <br />
            하지만 그 대충이 네 마음을 담고, 네 사람의 마음을 울릴지도 모른다. (우리가 장담은 안 한다.)
            <br />
            니편대써는 감성을 몰라도 괜찮다.
            <br />
            우리의 미학은 대충에서 시작되지만, 그 대충이 공학적 정밀함과 병맛 감성으로 완성된다.
            <br />
            이제, 손가락 한 번 움직여라.
            <br />
            니가 감성 없는 카이스트생이라면, 그건 아무 문제가 아니다.
            <br />
          </p>
            <h1 className="hheading">왜냐하면, 우리가 <strong>니편</strong>이니까.</h1>
            <div className="custom-margin"></div>
            <span>- 니편대써 팀 드림</span>
        </div>
        <div className={`button-group ${animateButtons ? "animate" : ""}`}>
          <button
            onClick={() => navigate("/create-letter")}
            className="button button-blue"
          >
            편지 생성하러 가기
          </button>
          <button
            onClick={() => navigate("/my-fonts")}
            className="button button-green"
          >
            폰트 적용하러 가기
          </button>
          <button
            onClick={() => navigate("/my-letters")}
            className="button button-yellow"
          >
            내 편지 보러가기
          </button>
        </div></div>
      </main>
    <NavBar />
  </div>
  );
};

export default MainPage;
