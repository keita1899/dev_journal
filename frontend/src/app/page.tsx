'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

import {
  CodeBracketIcon,
  DocumentTextIcon,
  SparklesIcon,
  UserGroupIcon,
  CommandLineIcon,
  AcademicCapIcon,
  LightBulbIcon,
  RocketLaunchIcon,
  PuzzlePieceIcon,
  ClipboardDocumentCheckIcon,
  CheckIcon,
  ArrowTrendingUpIcon,
  BriefcaseIcon,
  PresentationChartLineIcon,
  BoltIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

export default function LandingPage() {
  const [activeFeature, setActiveFeature] = useState(0)

  const articleTypes = [
    // 無料プラン
    {
      icon: <LightBulbIcon className="h-8 w-8" />,
      title: 'インプット記録',
      description: '学んだ技術や概念を体系的に整理',
      color: 'bg-purple-600',
      features: ['タグ付け', 'カテゴリ分類', '検索可能'],
      isFree: true,
    },
    {
      icon: <CodeBracketIcon className="h-8 w-8" />,
      title: 'エラー解決',
      description: 'エラーの内容・解決方法・原因を記録',
      color: 'bg-purple-700',
      features: ['エラーコード', '解決手順', '再現条件'],
      isFree: true,
    },
    {
      icon: <DocumentTextIcon className="h-8 w-8" />,
      title: 'コードレビュー',
      description: 'レビューで学んだベストプラクティス',
      color: 'bg-purple-600',
      features: ['改善前後の比較', 'レビュワーコメント', '学習ポイント'],
      isFree: true,
    },
    // Proプラン限定
    {
      icon: <ArrowTrendingUpIcon className="h-8 w-8" />,
      title: '技術キャッチアップ',
      description: '新技術を既知技術と比較しながら理解',
      color: 'bg-purple-500',
      features: ['技術比較表', 'メリット・デメリット', '対応関係'],
      isFree: false,
    },
    {
      icon: <AcademicCapIcon className="h-8 w-8" />,
      title: 'コーディング試験',
      description: '試験問題と解答プロセスを記録',
      color: 'bg-purple-500',
      features: ['問題内容', '解法', '時間計測'],
      isFree: false,
    },
    {
      icon: <BriefcaseIcon className="h-8 w-8" />,
      title: '面接対策',
      description: '技術面接の質問と回答、改善点を記録',
      color: 'bg-purple-700',
      features: ['質問内容', '回答の振り返り', '改善ポイント'],
      isFree: false,
    },
    {
      icon: <RocketLaunchIcon className="h-8 w-8" />,
      title: '開発機能',
      description: '実装した機能の内容と処理フロー',
      color: 'bg-purple-700',
      features: ['アーキテクチャ図', 'コードスニペット', '技術選定理由'],
      isFree: false,
    },
    {
      icon: <CommandLineIcon className="h-8 w-8" />,
      title: '環境構築',
      description: '環境構築の手順を詳細に記録',
      color: 'bg-purple-600',
      features: ['コマンド履歴', '設定ファイル', 'トラブルシューティング'],
      isFree: false,
    },
    {
      icon: <PresentationChartLineIcon className="h-8 w-8" />,
      title: '勉強会・カンファレンス',
      description: '参加したイベントで学んだことを記録',
      color: 'bg-purple-500',
      features: ['登壇者情報', '学習ポイント', 'アクションアイテム'],
      isFree: false,
    },
    {
      icon: <BoltIcon className="h-8 w-8" />,
      title: 'パフォーマンス改善',
      description: '最適化の手法と結果を記録',
      color: 'bg-purple-600',
      features: ['改善前後の数値', '最適化手法', 'パフォーマンス測定'],
      isFree: false,
    },
    {
      icon: <WrenchScrewdriverIcon className="h-8 w-8" />,
      title: 'リファクタリング',
      description: 'コード改善の記録と結果',
      color: 'bg-purple-700',
      features: ['リファクタリング理由', '改善手法', '結果の評価'],
      isFree: false,
    },
  ]

  const features = [
    {
      title: '自動日報生成',
      description: '記事を書くだけで、記事のリンクが自動的に日報にまとめられます',
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6" />,
    },
    {
      title: '内容に合わせた記事タイプ',
      description: '内容に合わせてわかりやすい記事タイプを選択できます',
      icon: <ClipboardDocumentCheckIcon className="h-6 w-6" />,
    },
    {
      title: '技術スタック管理',
      description: '使用している技術スタックを登録して、記事作成時に簡単に紐付け',
      icon: <PuzzlePieceIcon className="h-6 w-6" />,
    },
    {
      title: 'GitHub連携',
      description: 'GitHub Appで日報を自動的にリポジトリにプッシュ',
      icon: <CodeBracketIcon className="h-6 w-6" />,
    },
    {
      title: '知識の共有',
      description: '公開記事で他のエンジニアと知見を共有',
      icon: <UserGroupIcon className="h-6 w-6" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      {/* Hero Section */}
      <section className="relative px-6 pb-20 pt-32">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-7xl">
              <span className="text-white">エンジニアの成長を</span>
              <br />
              <span className="text-purple-400">可視化する</span>
            </h1>
            <p className="mx-auto mb-10 max-w-3xl text-xl text-gray-300 md:text-2xl">
              日々の学習を記録し、成長の軌跡を残す。
              <br />
              エンジニアのための統合学習記録プラットフォーム
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <button className="group transform rounded-full bg-purple-600 px-8 py-4 text-lg font-semibold transition-all hover:scale-105 hover:bg-purple-700">
                無料で始める
                <ArrowRightIcon className="ml-2 inline-block h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button className="rounded-full border border-purple-400 px-8 py-4 text-lg font-semibold transition-all hover:border-purple-300 hover:bg-purple-950">
                デモを見る
              </button>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="animate-float absolute left-10 top-20">
          <div className="h-32 w-32 rounded-2xl bg-purple-600 p-4 opacity-10 blur-xl"></div>
        </div>
        <div className="animate-float-delay absolute bottom-20 right-10">
          <div className="h-40 w-40 rounded-2xl bg-purple-500 p-4 opacity-15 blur-xl"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-800/30 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">
            <span className="text-purple-400">主要機能</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border border-gray-600 bg-gray-800/70 p-6 backdrop-blur-sm transition-all hover:scale-105 hover:transform hover:border-purple-500 hover:bg-gray-800/90"
              >
                <div className="mb-4 w-fit rounded-xl bg-purple-600 p-3">{feature.icon}</div>
                <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Types Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">
            <span className="text-purple-400">記録できる記事タイプ</span>
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {articleTypes.map((type, index) => (
              <div
                key={index}
                className={`group relative rounded-3xl border bg-gray-800/50 p-8 backdrop-blur-sm transition-all hover:scale-105 hover:transform ${
                  type.isFree
                    ? 'border-green-500/30 hover:border-green-500'
                    : 'border-purple-500/30 hover:border-purple-500'
                } hover:bg-gray-800/70`}
                onMouseEnter={() => setActiveFeature(index)}
              >
                {/* プランラベル */}
                <div className="absolute -right-3 -top-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      type.isFree ? 'bg-green-600 text-white' : 'bg-purple-600 text-white'
                    }`}
                  >
                    {type.isFree ? '無料' : 'Pro'}
                  </span>
                </div>
                <div className={`${type.color} mb-6 w-fit rounded-2xl p-4`}>{type.icon}</div>
                <h3 className="mb-3 text-2xl font-bold">{type.title}</h3>
                <p className="mb-4 text-gray-400">{type.description}</p>
                <ul className="space-y-2">
                  {type.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <SparklesIcon className="mr-2 h-4 w-4 text-purple-400" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-purple-900/20 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-4xl font-bold md:text-5xl">
            <span className="text-purple-400">料金プラン</span>
          </h2>
          <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
            {/* Free Plan */}
            <div className="rounded-3xl border border-gray-600 bg-gray-800/50 p-8 transition-all hover:border-purple-500">
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-2xl font-bold">無料プラン</h3>
                <div className="mb-2 text-4xl font-bold text-purple-400">￥0</div>
                <p className="text-gray-400">永久無料</p>
              </div>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-gray-300">基本的な記事タイプ（3種類）</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-gray-300">シンプルな日報生成</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-gray-300">基本的な技術スタック管理</span>
                </li>
              </ul>
              <button className="w-full rounded-full bg-gray-700 py-3 font-semibold transition-all hover:bg-gray-600">
                無料で始める
              </button>
            </div>

            {/* Pro Plan */}
            <div className="relative rounded-3xl border-2 border-purple-500 bg-purple-600/10 p-8 transition-all hover:border-purple-400">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                <span className="rounded-full bg-purple-600 px-4 py-1 text-sm font-semibold text-white">
                  おすすめ
                </span>
              </div>
              <div className="mb-6 text-center">
                <h3 className="mb-2 text-2xl font-bold">Proプラン</h3>
                <div className="mb-2 text-4xl font-bold text-purple-400">￥490</div>
                <p className="text-gray-400">月額</p>
              </div>
              <ul className="mb-8 space-y-2">
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-gray-300">全11種類の記事タイプ</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-sm text-gray-300">AI生成：学習内容の要約・振り返り</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-sm text-gray-300">GitHub連携・自動プッシュ</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-sm text-gray-300">記事の公開・共有</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-sm text-gray-300">学習進捗の可視化</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-sm text-gray-300">カスタムテンプレート・タグ管理</span>
                </li>
                <li className="flex items-center">
                  <CheckIcon className="mr-3 h-5 w-5 flex-shrink-0 text-purple-400" />
                  <span className="text-sm text-gray-300">PDF・Markdown出力機能</span>
                </li>
              </ul>
              <button className="w-full rounded-full bg-purple-600 py-3 font-semibold transition-all hover:bg-purple-700">
                Proプランを始める
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-bold md:text-5xl">
            <span className="text-purple-400">今すぐ始めよう</span>
          </h2>
          <p className="mb-10 text-xl text-gray-300">
            あなたのエンジニアリング成長記録を始める最初の一歩を踏み出しましょう
          </p>
          <button className="group transform rounded-full bg-purple-600 px-10 py-5 text-xl font-semibold transition-all hover:scale-105 hover:bg-purple-700">
            無料アカウント作成
            <ArrowRightIcon className="ml-2 inline-block h-6 w-6 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      <Footer />

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes float-delay {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-30px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  )
}
