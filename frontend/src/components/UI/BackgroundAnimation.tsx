import React from 'react';
export const BackgroundAnimation = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return <div className="relative min-h-screen bg-gradient-to-br from-blue-100 via-gray-100 to-teal-100 flex flex-col items-center justify-center w-full overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#00A7A7] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
      <div className="absolute top-3/4 right-0 w-[400px] h-[400px] bg-[#2563eb] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[300px] bg-[#008B8B] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-4000"></div>
      {/* Floating particles */}
      <div className="absolute h-full w-full overflow-hidden">
        {Array.from({
        length: 15
      }).map((_, i) => <div key={i} className="absolute rounded-full bg-[#00A7A7]" style={{
        width: Math.random() * 4 + 1 + 'px',
        height: Math.random() * 4 + 1 + 'px',
        top: Math.random() * 100 + '%',
        left: Math.random() * 100 + '%',
        opacity: Math.random() * 0.2 + 0.1,
        animation: `floatingParticle ${Math.random() * 10 + 20}s linear infinite`
      }}></div>)}
      </div>
      {/* Medical pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cGF0aCBkPSJNMjYgMjZWMTRoOHYxMmgxMnY4SDM0djEyaC04VjM0SDE0di04aDEyeiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDBBN0E3IiBzdHJva2Utd2lkdGg9IjEiIG9wYWNpdHk9IjAuMDUiLz48L3N2Zz4=')] opacity-10"></div>
      {/* Content */}
      <div className="relative z-10 w-full">{children}</div>
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes floatingParticle {
          0% {
            transform: translateY(0) translateX(0);
          }
          33% {
            transform: translateY(-100px) translateX(100px);
          }
          66% {
            transform: translateY(100px) translateX(-100px);
          }
          100% {
            transform: translateY(0) translateX(0);
          }
        }
        @keyframes blob {
          0% {
            transform: scale(1);
          }
          33% {
            transform: scale(1.1);
          }
          66% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        .animate-blob {
          animation: blob 15s infinite alternate;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>;
};