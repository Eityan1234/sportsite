This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


ブランチ名
master: 初期コード
release:完成コード
develop:開発途中コード

ディレクトリ構成
.
├── app/                          # アプリケーションルート
│   ├── (page)/                   # ページルート（URLには含まれない）
│   │   └── soccer/               # 例）サッカーのフォルダ
│   │       ├── example/          # ページフォルダ
│   │       │   └── page.tsx      # ページファイル
│   │       └── (components)/     # コンポーネント　※中のフォルダ構成は自由　   
│   ├── api/                      # APIルート
│   │    └── example/             # エンドポイント例：/api/players
│   │        └── route.ts         # API関数
│   ├── globals.css               # css定義を書く　※このファイルは使用せずpage.tsxに直書きで良い
│   ├── layout.tsx                # アプリ全体に定義したい場合に使用　例）CSS, Provider など
│   ├── not-found.tsx             # 404ページ
│   └── page.tsx                  # トップページ
├── public/                       # 静的ファイル（画像やフォントなど）
├── README.md                     # テキスト
└── .env                          # 環境変数　※githubには上げない。ローカルでのみ管理

