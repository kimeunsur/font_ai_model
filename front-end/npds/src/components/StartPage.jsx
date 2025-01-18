import { Button } from "./ui/Button";
import { Card, CardContent } from "./ui/Card";
import React from "react";

const StartPage = () => {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-yellow-100 to-blue-100">
      <Card className="bg-transparent border-none shadow-none">
        <CardContent className="flex flex-col items-center justify-center gap-20">
          <h1 className="text-6xl text-center font-normal leading-normal">
            저희가 써 드릴게요,
            <br />
            편지
          </h1>
          <Button variant="ghost" size="lg" className="hover:bg-white/20">
            시작하기
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default StartPage;
