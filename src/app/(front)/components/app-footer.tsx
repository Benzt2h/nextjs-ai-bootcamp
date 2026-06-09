import { useEffect, useState } from "react";

export default function AppFooter() {
  const [company, setCompany] = useState('COSCI'); 

  const currentDate = <div>{ new Date().toLocaleDateString()}</div>;

  useEffect(() => {
    console.log('จะทำครั้งแรก และทุกครั้งที่มีการ re-render ใหม่');
  });

  useEffect(() => {
    console.log('จะทำครั้งแรกครั้งเดียวเท่านั้น');
  }, []);

  useEffect(() => {
    console.log('จะทำครั้งแรก และเฉพาะเมื่อตัวแปร company อัปเดตค่า');
  }, [company]);

  const handleMouseOver = () => {
    setCompany('SWU');
  }
    
  return (
    <div className="border-t border-border mt-12 py-8 px-6 text-center text-sm text-muted-foreground">
       <p onMouseOver={handleMouseOver} className="font-bold text-primary cursor-pointer">{company}</p>
       {currentDate}
       <p>codingthailand@gmail.com &copy; { new Date().getFullYear() }</p>
    </div>
  );
}