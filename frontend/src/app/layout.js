import './globals.css';

export const metadata = {
  title: 'Fleet Tracker',
  description: 'GPS Fleet Monitoring System',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
