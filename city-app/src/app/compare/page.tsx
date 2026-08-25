import { cityDistanceRepository } from '@/core';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Sparkles, ArrowRight, CheckCircle2, XCircle, Type, Shuffle } from 'lucide-react';

interface ComparePageProps {
  searchParams: Promise<{ word1?: string; word2?: string }>;
}

export default async function ComparePage({ searchParams }: ComparePageProps) {
  const resolvedParams = await searchParams;
  const word1 = resolvedParams.word1 || 'algoritmo';
  const word2 = resolvedParams.word2 || 'logaritmo';

  let comparison = null;
  let errorMessage: string | null = null;

  try {
    comparison = await cityDistanceRepository.compareWords(word1, word2);
  } catch (err: any) {
    errorMessage = err.message || 'Failed to compare words via backend';
  }

  const presets = [
    { w1: 'roma', w2: 'amor', label: 'Roma ➔ Amor' },
    { w1: 'algoritmo', w2: 'logaritmo', label: 'Algoritmo ➔ Logaritmo' },
    { w1: 'listen', w2: 'silent', label: 'Listen ➔ Silent' },
    { w1: 'frontend', w2: 'backend', label: 'Frontend ➔ Backend' },
  ];

  let anagramBanner: React.ReactNode;
  if (comparison && comparison.isAnagram) {
    anagramBanner = (
      <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-emerald-300">
        <CheckCircle2 className="h-6 w-6 text-emerald-400" />
        <div>
          <h4 className="font-bold">Perfect Anagram!</h4>
          <p className="text-xs text-slate-300">
            &ldquo;{word1}&rdquo; and &ldquo;{word2}&rdquo; contain the exact same letters in a
            different order.
          </p>
        </div>
      </div>
    );
  } else {
    anagramBanner = (
      <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-4 text-slate-400">
        <XCircle className="h-6 w-6 text-slate-500" />
        <div>
          <h4 className="font-bold text-slate-200">Not an Anagram</h4>
          <p className="text-xs text-slate-400">
            These two words share some letters but do not form an exact anagram.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-teal-500/20 bg-teal-500/10 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider text-teal-300">
          <Type className="h-3.5 w-3.5" />
          Lexical & Anagram Engine
        </div>
        <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
          Word Comparison & Anagram Analyzer
        </h1>
        <p className="text-slate-400">
          Analyze two arbitrary words to find common letters, vowels, consonants, and detect
          anagrams.
        </p>

        {/* Presets */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <span className="text-xs font-semibold text-slate-400">Try these:</span>
          {presets.map((p) => (
            <a
              key={p.label}
              href={`/compare?word1=${encodeURIComponent(p.w1)}&word2=${encodeURIComponent(p.w2)}`}
            >
              <Badge
                variant="secondary"
                className="cursor-pointer transition-colors hover:border-teal-500/40 hover:text-teal-300"
              >
                {p.label}
              </Badge>
            </a>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <Card className="border-slate-800 bg-slate-900/80">
        <CardContent className="p-6">
          <form method="GET" action="/compare" className="grid grid-cols-1 gap-4 sm:grid-cols-12">
            <div className="sm:col-span-5">
              <label className="mb-1.5 block text-xs font-semibold text-slate-400">
                First Word
              </label>
              <Input name="word1" defaultValue={word1} placeholder="e.g. Algoritmo" required />
            </div>

            <div className="sm:col-span-5">
              <label className="mb-1.5 block text-xs font-semibold text-slate-400">
                Second Word
              </label>
              <Input name="word2" defaultValue={word2} placeholder="e.g. Logaritmo" required />
            </div>

            <div className="flex items-end sm:col-span-2">
              <Button
                type="submit"
                className="w-full gap-2 bg-teal-600 font-semibold hover:bg-teal-500"
              >
                <span>Analyze</span>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {errorMessage && (
        <Card className="border-red-900/40 bg-red-950/20 text-center">
          <CardContent className="p-8">
            <p className="font-semibold text-red-400">{errorMessage}</p>
          </CardContent>
        </Card>
      )}

      {comparison && (
        <div className="space-y-6">
          {anagramBanner}

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-slate-800 text-center">
              <CardContent className="p-6">
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  Similarity Score
                </span>
                <p className="mt-2 text-4xl font-extrabold text-teal-400">
                  {comparison.similarityPercentage}%
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 text-center">
              <CardContent className="p-6">
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  Common Letters
                </span>
                <p className="mt-2 text-4xl font-extrabold text-white">
                  {comparison.commonLettersCount}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-800 text-center">
              <CardContent className="p-6">
                <span className="text-xs uppercase tracking-wider text-slate-400">
                  Anagram Match
                </span>
                <p className="mt-2 text-4xl font-extrabold text-emerald-400">
                  {comparison.isAnagram ? 'YES' : 'NO'}
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-800 bg-slate-900/60">
            <CardHeader>
              <CardTitle>Detailed Breakdown</CardTitle>
              <CardDescription>
                Letter by letter analysis comparing &ldquo;{word1}&rdquo; and &ldquo;{word2}&rdquo;
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <span className="mb-2 block text-xs font-semibold text-slate-400">
                  Shared Letters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {comparison.commonLetters.map((letter) => (
                    <span
                      key={letter}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-teal-500/30 bg-teal-500/10 font-mono text-base font-bold uppercase text-teal-300"
                    >
                      {letter}
                    </span>
                  ))}
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <span className="text-xs text-slate-400">Shared Vowels</span>
                  <p className="mt-1 font-mono text-lg font-bold uppercase text-slate-200">
                    {comparison.sharedVowels.join(', ') || 'None'}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-4">
                  <span className="text-xs text-slate-400">Shared Consonants</span>
                  <p className="mt-1 font-mono text-lg font-bold uppercase text-slate-200">
                    {comparison.sharedConsonants.join(', ') || 'None'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
