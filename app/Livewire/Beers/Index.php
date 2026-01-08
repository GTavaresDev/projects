<?php

namespace App\Livewire\Beers;

use Livewire\Component;
use Livewire\WithPagination;
use App\Services\BeerService;
use App\Models\Beer;

class Index extends Component
{
    use WithPagination;

    public $sortBy = '';
    public $sortDirection = 'asc';
    public $filters = [];

    public function sort(string $field)
    {
        if ($this->sortBy === $field) {
            $this->sortDirection = $this->sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
            $this->sortBy = $field;
            $this->sortDirection = 'asc';
        }

        $this->resetPage();
    }

    public function filter()
    {
        $this->validate([
            'filters.name' => 'nullable|string|min:3|max:255',
            'filters.property' => 'nullable|in:abv,ibu,ebc,ph,volume',
            'filters.operator' => 'required_with:filters.property|in:=,>,<,>=,<=',
            'filters.value' => 'required_with:filters.property|numeric',
        ]);

        $this->resetPage();
    }

    public function remove(int $beerId)
    {
        $beer = Beer::findOrFail($beerId);

        $name = $beer->name;

        $beer->delete();

        return redirect()
            ->route('beers.index')
            ->success("Cerveja {$name} removida com sucesso!");
    }

    public function render(BeerService $beerService)
    {
        return view('livewire.beers.index', [
            'beers' => $beerService->getBeers(
                $this->sortBy,
                $this->sortDirection,
                $this->filters
            )
        ]);
    }
}
