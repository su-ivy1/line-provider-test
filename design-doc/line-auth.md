# LINE認証機能設計ドキュメント

## 概要

このドキュメントでは、Next.jsアプリケーションにLINE認証機能を実装するための設計について説明します。NextAuthとLINE Providerを使用して、ユーザーがLINEアカウントを使ってアプリケーションにログインできるようにします。

## 目的

- ユーザーがLINEアカウントを使って簡単にログインできるようにする
- セキュアな認証フローを提供する
- ユーザー体験を向上させる

## 技術スタック

- Next.js 15.2.1
- NextAuth.js
- LINE Login API

## アーキテクチャ

### コンポーネント構成

```
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts  # NextAuth API ルート
│   ├── auth/
│   │   ├── signin/
│   │   │   └── page.tsx      # サインインページ
│   │   ├── signout/
│   │   │   └── page.tsx      # サインアウトページ
│   │   └── error/
│   │       └── page.tsx      # エラーページ
│   ├── protected/
│   │   └── page.tsx          # 保護されたページ
│   ├── page.tsx              # ホームページ
│   ├── layout.tsx            # ルートレイアウト
│   └── globals.css           # グローバルスタイル
└── middleware.ts             # 認証ミドルウェア
```

### 認証フロー

1. ユーザーがログインボタンをクリック
2. LINE認証画面にリダイレクト
3. ユーザーがLINEでログインを承認
4. コールバックURLにリダイレクト
5. NextAuthがトークンを処理
6. セッションが作成され、ユーザーがログイン状態になる

## 実装詳細

### 環境変数

```
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret_key
LINE_CLIENT_ID=your_line_channel_id
LINE_CLIENT_SECRET=your_line_channel_secret
```

### NextAuth設定

NextAuthの設定では、LINE Providerを使用し、JWTとセッションのコールバックを設定します。

```typescript
// src/app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import LineProvider from "next-auth/providers/line";

const handler = NextAuth({
  providers: [
    LineProvider({
      clientId: process.env.LINE_CLIENT_ID as string,
      clientSecret: process.env.LINE_CLIENT_SECRET as string,
    }),
  ],
  // ...その他の設定
});
```

### 保護されたルート

ミドルウェアを使用して、認証が必要なルートへのアクセスを制限します。

```typescript
// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// 保護されたルート
const protectedRoutes = ["/protected"];

export async function middleware(request: NextRequest) {
  // ...認証チェックロジック
}
```

## セキュリティ考慮事項

- NEXTAUTH_SECRETは強力なランダム文字列を使用
- 環境変数は.env.localファイルで管理し、バージョン管理から除外
- LINE Developer Consoleでの適切な権限設定
- HTTPSの使用（本番環境）

## LINE Developer Console設定

1. LINE Developersにログイン
2. 新しいプロバイダーとチャネルを作成
3. 以下の設定を行う:
   - チャネル種別: ウェブアプリ
   - コールバックURL: `http://localhost:3000/api/auth/callback/line`（開発環境）
   - スコープ: profile, openid, email

## テスト計画

1. ログインフローのテスト
   - LINEログインボタンをクリック
   - LINE認証画面が表示される
   - 承認後、アプリにリダイレクトされる

2. セッション維持のテスト
   - ブラウザを更新してもログイン状態が維持される
   - 保護されたページにアクセスできる

3. ログアウトフローのテスト
   - ログアウトボタンをクリック
   - セッションが終了する
   - 保護されたページにアクセスできなくなる

## 今後の拡張

- 複数の認証プロバイダーのサポート（Google, GitHub, Twitterなど）
- ユーザープロファイル管理機能
- ロール/権限ベースのアクセス制御
- リフレッシュトークンの実装

## 参考リソース

- [NextAuth.js ドキュメント](https://next-auth.js.org/)
- [LINE Login ドキュメント](https://developers.line.biz/ja/docs/line-login/)