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
                    wire:model.live="form.name"
                />
            </flux:field>

            <flux:field>
                <flux:input 
                    label="Tagline"
                    placeholder="Frase de destaque"
                    wire:model.live="form.tagline"
                />
            </flux:field>

            <flux:field>
                <flux:textarea 
                    label="Descrição"
                    wire:model.live="form.description"
                />
            </flux:field>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                <flux:field>
                    <flux:input 
                        label="Primeira Brassagem"
                        type="date"
                        wire:model.live="form.first_brewed_at"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="ABV"
                        type="number"
                        step="0.1"
                        wire:model.live="form.abv"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="IBU"
                        type="number"
                        wire:model.live="form.ibu"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="EBC"
                        type="number"
                        wire:model.live="form.ebc"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="pH"
                        type="number"
                        step="0.1"
                        wire:model.live="form.ph"
                    />
                </flux:field>

                <flux:field>
                    <flux:input 
                        label="Volume (ml)"
                        type="number"
                        wire:model.live="form.volume"
                    />
                </flux:field>

            </div>

            <flux:field>
                <flux:textarea 
                    label="Ingredientes"
                    wire:model.live="form.ingredients"
                />
            </flux:field>

            <flux:field>
                <flux:textarea 
                    label="Dicas do Cervejeiro"
                    wire:model.live="form.brewer_tips"
                />
            </flux:field>

            <flux:button 
                type="submit" 
                color="primary"
            >
                Criar Cerveja
            </flux:button>

        </form>
    </x-section>
</div>
