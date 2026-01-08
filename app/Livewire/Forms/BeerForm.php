<?php

namespace App\Livewire\Forms;

use Livewire\Form;
use Livewire\Attributes\Validate;
use App\Models\Beer; 

class BeerForm extends Form
{
    public ?Beer $beer = null;
    #[Validate('required|string|max:255')]
    public string $name = '';

    #[Validate('nullable|string|max:255')]
    public ?string $tagline = null;

    #[Validate('required|string')]
    public string $description = '';

    #[Validate('required|date')]
    public string $first_brewed_at = '';

    #[Validate('required|numeric|min:0|max:99.9')]
    public ?float $abv = null;

    #[Validate('required|integer|min:0')]
    public ?int $ibu = null;

    #[Validate('required|integer|min:0')]
    public ?int $ebc = null;

    #[Validate('required|numeric|min:0|max:14')]
    public ?float $ph = null;

    #[Validate('required|integer|min:1')]
    public ?int $volume = null;

    #[Validate('nullable|string')]
    public ?string $ingredients = null;

    #[Validate('nullable|string')]
    public ?string $brewer_tips = null;

    public function setBeer(Beer $beer): void
    {
        $this->beer = $beer;
        $this->name = $beer->name;
        $this->tagline = $beer->tagline;
        $this->description = $beer->description;
        $this->first_brewed_at = $beer->first_brewed_at->format('Y-m-d');
        $this->abv = $beer->abv;
        $this->ibu = $beer->ibu;
        $this->ebc = $beer->ebc;
        $this->ph = $beer->ph;
        $this->volume = $beer->volume;
        $this->ingredients = $beer->ingredients;
        $this->brewer_tips = $beer->brewer_tips;
    }
    public function store(): Beer
    {
        return Beer::create($this->validate());
    }
      public function rules(){
        return [
            'name' => 'required|string|max:255',
            'tagline' => 'nullable|string|max:255',
            'description' => 'required|string',
            'first_brewed_at' => 'required|date',
            'abv' => 'required|numeric|min:0|max:99.9',
            'ibu' => 'required|integer|min:0',
            'ebc' => 'required|integer|min:0',
            'ph' => 'required|numeric|min:0|max:14',
            'volume' => 'required|integer|min:1',
            'ingredients' => 'nullable|string',
            'brewer_tips' => 'nullable|string',
        ];
    }
    public function update(Beer $beer): Beer
    {
        $beer->update($this->validate());

        return $beer;
    }
}


  