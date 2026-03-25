// import bg_image from "../../../public/auth/auth_image.png";

// export default function AuthLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
//       {/* Background gradient */}
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-purple-500/20" />

//       {/* Background pattern */}
//       <div
//         className="absolute inset-0 opacity-[0.03]"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
//         }}
//       />

//       {/* Content */}
//       <div className="relative z-10 w-full max-w-md px-4">{children}</div>
//     </div>
//   );
// }

import bg_image from "../../../public/auth/auth_image.png";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${bg_image.src})`,
        }}
      />

      {/* Optional dark overlay (important for readability) */}
      <div className="absolute inset-0 bg-black/5" />

      {/* Gradient */}
      {/* <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-transparent to-purple-500/20" /> */}

      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg ... %3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-md px-4">{children}</div>
    </div>
  );
}
