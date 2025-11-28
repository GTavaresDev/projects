<div>
    <flux:main container="">
        <div class="flex flex-row items-center justify-between w-full">
            <div>
                <flux:heading size="xl">Cervejas</flux:heading>
                <flux:text class="mt-2 mb-6 text-base">Listagem de Cervejas</flux:text>        
            </div>  
            
            <flux:button href="{{ route('beers.create') }}" icon="plus-circle" color="primary" class="mb-4">
                Adicionar Cerveja
            </flux:button>
        </div>
    </flux:main>
</div>  