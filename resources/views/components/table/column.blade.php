@props([
    'sortable' => false,
    'sorted' => false,
    'direction' => null,
])

<th class="py-3 px-3 first:ps-0 last:pe-0 text-start text-sm font-medium
           text-zinc-800 dark:text-white border-b border-zinc-800/10
           dark:border-white/20">

    <div class="flex in-[.group\/center-align]:justify-center in-[.group\/end-align]:justify-end">

        @if (!$sortable)
            {{ $slot }}
        @else
            <button
                type="button"
                {{ $attributes }}
                class="group/sortable flex items-center gap-1 -my-1 -ms-2 -me-2 px-2 py-1
                       in-[.group\/end-align]:flex-row-reverse">

                <div>{{ $slot }}</div>

                @if ($sorted && $direction)
                    <div
                        @class([
                            'w-3 h-3 mt-0.5 text-zinc-900 dark:text-white transition-transform',
                            'rotate-180' => $direction === 'desc',
                        ])
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 24 24" stroke-width="1.5"
                             stroke="currentColor" class="size-4">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                        </svg>
                    </div>
                @endif

            </button>
        @endif

    </div>
</th>
