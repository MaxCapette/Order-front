// import React, { useEffect } from 'react';
// import "./NavCategories.scss";
// import { useNavigate } from 'react-router-dom';

// function NavCategories() {
//   const navigate = useNavigate();

//   const goBack = () => {
//     navigate('/');
//   };

//   useEffect(() => {
//     const threshold = 150; // Distance minimale à glisser pour déclencher la navigation
//     let startX;

//     const onTouchStart = (e) => {
//       startX = e.touches[0].clientX;
//     };

//     const onTouchMove = (e) => {
//       if (!startX) {
//         return;
//       }

//       const x = e.touches[0].clientX;
//       const difference = startX - x;

//       if (difference > threshold) {
//         goBack();
//       }
//     };

//     const onTouchEnd = () => {
//       startX = null;
//     };

//     window.addEventListener('touchstart', onTouchStart);
//     window.addEventListener('touchmove', onTouchMove);
//     window.addEventListener('touchend', onTouchEnd);

//     return () => {
//       window.removeEventListener('touchstart', onTouchStart);
//       window.removeEventListener('touchmove', onTouchMove);
//       window.removeEventListener('touchend', onTouchEnd);
//     };
//   }, []);

//   return (
//     <div className="NavCat">
//       {/* Les autres boutons */}
//       <button type="button" className="NavBtn" onClick={goBack}>
//         RETOUR ARRIÈRE
//       </button>
//     </div>
//   );
// }

// export default NavCategories;
