<?php

namespace App\Livewire\Beers;

use Livewire\Component;

class Create extends Component
{
    public Beerform $beerform;
    public function render()
    {
        return view('livewire.beers.create');
    }

    public function save(){
        try {
            $beer = $this->form->store();

            session()->flash('success', 'Beer created successfully.');

            return redirect()->route('beers.index');
        } catch (\Exception $e) {
            session()->flash('error', 'An error occurred while creating the beer: ' . $e->getMessage());
        }
    }
}
