<div>
    <div class="flex flex-row items-center justify-between w-full">
        <div>
            <flux:heading size="xl">Cerveja</flux:heading>
            <flux:text class="mt-2 mb-6 text-base">
                Criar Cerveja
            </flux:text>
        </div>

        <flux:button 
            href="{{ route('beers.index') }}" 
            icon="arrow-left" 
            color="primary" 
            class="mb-4"
        >
            Voltar
        </flux:button>
    </div>

    <x-section> 
        <form wire:submit.prevent="save" class="space-y-6">

            <flux:field>
                <flux:input 
                    label="Nome"
                    placeholder="Nome da Cerveja"
                    wire:model.defer="beerForm.name"
                />
            </flux:field>

            <flux:field>
                <flux:input 
                    label="Tagline"
                    placeholder="Frase de destaque"
                    wire:model.defer="beerForm.tagline"
                />
            </flux:field>

            <flux:field>
                <flux:textarea 
                    label="Descrição"
                    wire:model.defer="beerForm.description"
                />
            </flux:field>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <flux:field>
                    <flux:input 
                        label="Primeira Brassagem"
                        type="date"
                        wire:model.defer="beerForm.first_brewed_at"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="ABV"
                        type="number"
                        step="0.1"
                        wire:model.defer="beerForm.abv"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="IBU"
                        type="number"
                        wire:model.defer="beerForm.ibu"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="EBC"
                        type="number"
                        wire:model.defer="beerForm.ebc"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="pH"
                        type="number"
                        step="0.1"
                        wire:model.defer="beerForm.ph"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="Volume (ml)"
                        type="number"
                        wire:model.defer="beerForm.volume"
                    />
                </flux:field>

            </div>

            <flux:field>
                <flux:textarea 
                    label="Ingredientes"
                    wire:model.defer="beerForm.ingredients"
                />
            </flux:field>

            <flux:field>
                <flux:textarea 
                    label="Dicas do Cervejeiro"
                    wire:model.defer="beerForm.brewer_tips"
                />
            </flux:field>

            <flux:separator/>

            {{-- Componente de upload de imagens --}}
            <livewire:components.image-uploader 
                :model="$beer"
                :existing-images="[]"
                storage-path="{{ $beer ? 'beers/' . $beer->id : '' }}"
                wire:key="image-uploader-{{ $beer?->id ?? 'new' }}"
            />

            <div class="flex justify-end">
                <flux:button 
                    type="submit" 
                    color="primary"
                >
                    Criar Cerveja
                </flux:button>
            </div>

        </form>
    </x-section>
</div>
