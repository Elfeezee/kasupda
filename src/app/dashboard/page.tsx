// 'use client';

// import { useSearchParams } from 'next/navigation';
// import React from 'react';

// const DashboardPage: React.FC = () => {
//   const searchParams = useSearchParams();
//   const userName = searchParams.get('name') || 'User'; // 'User' as a fallback

//   // Placeholder user information
//   const permitStatus = 'Pending Review';
//   const applicationDate = '2023-10-27';

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6">Welcome, {userName}!</h1>
//       <div className="bg-white shadow-md rounded-lg p-6">
//         <h2 className="text-xl font-semibold mb-4">Your Permit Application</h2>
//         <p className="text-gray-700 mb-2">
//           Status: <span className="font-medium">{permitStatus}</span>
//         </p>
//         <p className="text-gray-700">
//           Application Date: <span className="font-medium">{applicationDate}</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;
