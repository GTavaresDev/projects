<div class="bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 p-6 rounded-xl space-y-2 text-zinc-900 dark:text-white">
    <flux:label>Imagens</flux:label>
    <flux:text class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Faça upload de imagens da cerveja. A primeira será definida como capa.
    </flux:text>

    <div class="mt-3">
        <input 
            type="file"
            wire:model="images"
            multiple
            accept="image/*"
            class="block w-full text-sm text-zinc-800 dark:text-zinc-200
                   bg-white dark:bg-zinc-700 border border-zinc-200 dark:border-white/10
                   rounded-xl p-3 cursor-pointer focus:ring-2 focus:ring-primary-500
                   focus:outline-none transition-colors"
        >

        @error('images.*')
            <flux:text class="mt-2 text-sm text-red-600 dark:text-red-400">
                {{ $message }}
            </flux:text>
        @enderror

        <div wire:loading wire:target="images" class="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            Carregando imagens...
        </div>

        {{-- Imagens existentes --}}
        @if (!empty($existingImages))
            <div class="mt-4">
                <flux:text class="text-sm font-medium mb-2">Imagens existentes</flux:text>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    @foreach ($existingImages as $image)
                        <div class="relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-white/10">
                            @php
                                $imagePath = $image['path'] ?? null;
                                $imageUrl = '';
                                $fileExists = false;
                                
                                if ($imagePath) {
                                    // O path retornado por store() já é relativo ao disco 'public'
                                    // Exemplo: 'beers/59/filename.jpg'
                                    // Precisamos apenas adicionar 'storage/' para asset()
                                    $cleanPath = ltrim($imagePath, '/');
                                    $imageUrl = asset('storage/' . $cleanPath);
                                    
                                    // Verifica se o arquivo existe no storage
                                    try {
                                        $fileExists = Storage::disk('public')->exists($cleanPath);
                                    } catch (\Exception $e) {
                                        $fileExists = false;
                                    }
                                }
                            @endphp
                            @if($imageUrl && $imagePath)
                                @if($fileExists)
                                    <img 
                                        src="{{ $imageUrl }}" 
                                        alt="Imagem da cerveja" 
                                        class="object-cover w-full h-full"
                                        onerror="console.error('Erro ao carregar imagem:', '{{ $imageUrl }}', 'Path:', '{{ $imagePath }}'); this.parentElement.innerHTML='<div class=\'w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-700 gap-1\'><span class=\'text-xs text-zinc-500\'>Erro ao carregar</span><span class=\'text-xs text-zinc-400\'>Verifique o link simbólico</span></div>'"
                                    >
                                @else
                                    <div class="w-full h-full flex flex-col items-center justify-center bg-zinc-100 dark:bg-zinc-700 gap-1">
                                        <span class="text-xs text-zinc-500">Arquivo não encontrado</span>
                                        <span class="text-xs text-zinc-400">{{ substr($imagePath, 0, 25) }}...</span>
                                    </div>
                                @endif
                            @else
                                <div class="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-700">
                                    <span class="text-xs text-zinc-500">Sem path ({{ $imagePath ?? 'null' }})</span>
                                </div>
                            @endif

                            <button
                                type="button"
                                wire:click="removeExistingImage({{ $image['id'] }})"
                                wire:confirm="Tem certeza que deseja remover esta imagem?"
                                class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            @if (!empty($image['is_cover']) || (isset($image['is_cover']) && $image['is_cover']))
                                <div class="absolute bottom-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                                    Capa
                                </div>
                            @endif
                        </div>
                    @endforeach
                </div>
            </div>
        @endif

        {{-- Novas imagens para upload --}}
        @if (!empty($images))
            <div class="mt-4">
                <flux:text class="text-sm font-medium mb-2">Novas imagens</flux:text>
                <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    @foreach ($images as $image)
                        <div class="relative w-full h-32 rounded-lg overflow-hidden border border-zinc-200 dark:border-white/10">
                            <img 
                                src="{{ $image->temporaryUrl() }}" 
                                alt="Imagem da cerveja" 
                                class="object-cover w-full h-full"
                            >

                            <button
                                type="button"
                                wire:click="removeImage({{ $loop->index }})"
                                class="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            @if ($loop->first && empty($errors->first('images.*')) && empty($existingImages))
                                <div class="absolute bottom-2 left-2 bg-primary-600 text-white text-xs px-2 py-1 rounded">
                                    Capa
                                </div>
                            @endif
                        </div>
                    @endforeach
                </div>

                {{-- Botão para salvar imagens --}}
                <div class="mt-4 flex justify-end">
                    @if($model)
                        <flux:button type="button" color="primary" wire:click="saveImages">
                            Salvar Imagens
                        </flux:button>
                    @else
                        <div class="flex flex-col items-end">
                            <flux:text class="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
                                As imagens serão salvas automaticamente quando você criar a cerveja
                            </flux:text>
                        </div>
                    @endif
                </div>
            </div>
        @endif
    </div>
</div>
