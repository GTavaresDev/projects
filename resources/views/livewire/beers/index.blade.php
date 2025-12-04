<div>
    <flux:main container="">
        <div class="flex flex-row items-center justify-between w-full">
            <div>
                <flux:heading size="xl">Cervejas</flux:heading>
                <flux:text class="mt-2 mb-6 text-base">Listagem de Cervejas</flux:text>        
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

        <x-section>
            <x-table>
                <x-table.columns>

                    {{-- NOME --}}
                    <x-table.column 
                        wire:click="sort('name')"
                        sortable="name" 
                        :sorted="$sortBy === 'name'" 
                        :direction="$sortDirection"
                    >
                        Nome
                    </x-table.column>

                    {{-- FIRST BREWED --}}
                    <x-table.column 
                        wire:click="sort('first_brewed_at')"
                        sortable="first_brewed_at" 
                        :sorted="$sortBy === 'first_brewed_at'" 
                        :direction="$sortDirection"
                    >
                        Data da primeira receita
                    </x-table.column>

                    {{-- ABV --}}
                    <x-table.column 
                        wire:click="sort('abv')"
                        sortable="abv" 
                        :sorted="$sortBy === 'abv'" 
                        :direction="$sortDirection"
                        class="group/end-align text-end"
                    >
                        ABV %
                    </x-table.column>

                    {{-- IBU --}}
                    <x-table.column 
                        wire:click="sort('ibu')"
                        sortable="ibu" 
                        :sorted="$sortBy === 'ibu'" 
                        :direction="$sortDirection"
                        class="group/end-align text-end"
                    >
                        IBU
                    </x-table.column>

                    {{-- EBC --}}
                    <x-table.column 
                        wire:click="sort('ebc')"
                        sortable="ebc" 
                        :sorted="$sortBy === 'ebc'" 
                        :direction="$sortDirection"
                        class="group/end-align text-end"
                    >
                        EBC
                    </x-table.column>

                    {{-- pH --}}
                    <x-table.column 
                        wire:click="sort('ph')"
                        sortable="ph" 
                        :sorted="$sortBy === 'ph'" 
                        :direction="$sortDirection"
                        class="group/end-align text-end"
                    >
                        pH
                    </x-table.column>

                    {{-- VOLUME --}}
                    <x-table.column 
                        wire:click="sort('volume')"
                        sortable="volume" 
                        :sorted="$sortBy === 'volume'" 
                        :direction="$sortDirection"
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
                            <x-table.cell>{{ optional($beer->first_brewed_at)->format('d/m/Y') }}</x-table.cell>
                            <x-table.cell>{{ $beer->abv }}%</x-table.cell>
                            <x-table.cell>{{ $beer->ibu }}</x-table.cell>
                            <x-table.cell>{{ $beer->ebc }}</x-table.cell>
                            <x-table.cell>{{ $beer->ph }}</x-table.cell>
                            <x-table.cell>{{ $beer->volume }} ml</x-table.cell>
                            <x-table.cell>
                                <!-- ação exemplo -->
                                <a href="#" class="text-blue-500 underline">Editar</a>
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
