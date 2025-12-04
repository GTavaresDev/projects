<?php

namespace App\Livewire\Beers;

use Livewire\Component;
use App\Models\Beer;

class Index extends Component
{
    use \Livewire\WithPagination;
    // Evite tipagem rígida em propriedades públicas do Livewire
    public $sortBy = null;
    public $sortDirection = 'asc';

    public function sort($sortBy)
    {
        if ($this->sortBy !== $sortBy) {
            // nova coluna -> padrão asc
            $this->sortBy = $sortBy;
            $this->sortDirection = 'asc';
        } else {
            // mesma coluna -> alterna asc <-> desc
            $this->sortDirection = $this->sortDirection === 'asc' ? 'desc' : 'asc';
        }
    }

    public function render()
    {
        return view('livewire.beers.index',[
         'beers' => Beer::paginate()
        ]);        
    }
}

