<div>
    <flux:main container="">
        <div class="flex flex-row items-center justify-between w-full">
            <div>
                <flux:heading size="xl">Cervejas</flux:heading>
                <flux:text class="mt-2 mb-6 text-base">
                    Listagem de Cervejas
                </flux:text>
            </div>

            <flux:button 
                href="{{ route('beers.create') }}" 
                icon="plus-circle" 
                color="primary" 
                class="mb-4"
            >
                Adicionar Cerveja
            </flux:button>
        </div>

        <div class="grid grid-cols-12 gap-4 mb-6 items-end">

            {{-- Nome --}}
            <flux:field class="col-span-12 md:col-span-4 lg:col-span-3">
                <flux:input 
                    label="Nome"
                    placeholder="Pesquisar cervejas..."
                    wire:model.live="filters.name"
                />
            </flux:field>

            {{-- Propriedade --}}
            <flux:field class="col-span-12 md:col-span-4 lg:col-span-3">
                <flux:select 
                    label="Propriedade"
                    wire:model.live="filters.property"
                >
                    <option value="">Selecione</option>
                    <option value="abv">ABV</option>
                    <option value="ibu">IBU</option>
                    <option value="ebc">EBC</option>
                    <option value="ph">pH</option>
                    <option value="volume">Volume</option>
                </flux:select>
            </flux:field>

            {{-- Regra --}}
            <flux:field class="col-span-12 md:col-span-2">
                <flux:select 
                    label="Regra"
                    wire:model.live="filters.operator"
                >
                    <option value="">---</option>
                    <option value="=">Igual a (=)</option>
                    <option value=">=">Maior ou igual</option>
                    <option value="<=">Menor ou igual</option>
                    <option value=">">Maior que</option>
                    <option value="<">Menor que</option>

                </flux:select>
            </flux:field>

            {{-- Valor --}}
            <flux:field class="col-span-12 md:col-span-2">
                <flux:input 
                    type="number"
                    label="Valor"
                    wire:model.live="filters.value"
                />
            </flux:field>

            <flux:field class="col-span-1">
                <flux:button 
                    wire:click="filter" 
                    icon="magnifying-glass"
                    class="w-full"
                >
                    Filtrar
                </flux:button>

            </flux:field>
    
        </div>


        <x-section>
            <x-table>
                <x-table.columns>

                    {{-- NOME --}}
                    <x-table.column 
                        wire:click="sort('name')"
                        sortable="name"
                        :sorted="$sortBy === 'name'"
                        :direction="$sortBy === 'name' ? $sortDirection : null"
                    >
                        Nome
                    </x-table.column>

                    {{-- FIRST BREWED --}}
                    <x-table.column 
                        wire:click="sort('first_brewed_at')"
                        sortable="first_brewed_at"
                        :sorted="$sortBy === 'first_brewed_at'"
                        :direction="$sortBy === 'first_brewed_at' ? $sortDirection : null"
                    >
                        Data da primeira receita
                    </x-table.column>

                    {{-- ABV --}}
                    <x-table.column 
                        wire:click="sort('abv')"
                        sortable="abv"
                        :sorted="$sortBy === 'abv'"
                        :direction="$sortBy === 'abv' ? $sortDirection : null"
                        class="group/end-align text-end"
                    >
                        ABV %
                    </x-table.column>

                    {{-- IBU --}}
                    <x-table.column 
                        wire:click="sort('ibu')"
                        sortable="ibu"
                        :sorted="$sortBy === 'ibu'"
                        :direction="$sortBy === 'ibu' ? $sortDirection : null"
                        class="group/end-align text-end"
                    >
                        IBU
                    </x-table.column>

                    {{-- EBC --}}
                    <x-table.column 
                        wire:click="sort('ebc')"
                        sortable="ebc"
                        :sorted="$sortBy === 'ebc'"
                        :direction="$sortBy === 'ebc' ? $sortDirection : null"
                        class="group/end-align text-end"
                    >
                        EBC
                    </x-table.column>

                    {{-- pH --}}
                    <x-table.column 
                        wire:click="sort('ph')"
                        sortable="ph"
                        :sorted="$sortBy === 'ph'"
                        :direction="$sortBy === 'ph' ? $sortDirection : null"
                        class="group/end-align text-end"
                    >
                        pH
                    </x-table.column>

                    {{-- VOLUME --}}
                    <x-table.column 
                        wire:click="sort('volume')"
                        sortable="volume"
                        :sorted="$sortBy === 'volume'"
                        :direction="$sortBy === 'volume' ? $sortDirection : null"
                        class="group/end-align text-end"
                    >
                        Volume
                    </x-table.column>

                    {{-- AÇÕES --}}
                    <x-table.column class="text-end">
                        Ações
                    </x-table.column>

                </x-table.columns>

                <x-table.rows>
                    @foreach ($beers as $beer)
                        <x-table.row wire:key="beer-{{ $beer->id }}">
                            <x-table.cell>{{ $beer->name }}</x-table.cell>
                            <x-table.cell>
                                {{ optional($beer->first_brewed_at)->format('d/m/Y') }}
                            </x-table.cell>
                            <x-table.cell>{{ $beer->abv }}%</x-table.cell>
                            <x-table.cell>{{ $beer->ibu }}</x-table.cell>
                            <x-table.cell>{{ $beer->ebc }}</x-table.cell>
                            <x-table.cell>{{ $beer->ph }}</x-table.cell>
                            <x-table.cell>{{ $beer->volume }} ml</x-table.cell>
                            <x-table.cell>
                                    <flux:button
                                        icon="pencil"
                                        variant="ghost"
                                        size="sm"
                                        :href="route('beers.edit', $beer)"
                                    />
                                    <flux:button
                                        icon="trash"
                                        variant="ghost"
                                        size="sm"
                                        color="danger"
                                        wire:click="remove({{ $beer->id }})"
                                    />
                            </x-table.cell>
  

                        </x-table.row>
                    @endforeach
                </x-table.rows>
            </x-table>

            <div class="mt-6">
                {{ $beers->links() }}
            </div>
        </x-section>
    </flux:main>
</div>
