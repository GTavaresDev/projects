<?php

namespace App\Livewire\Forms;

use Livewire\Attributes\Validate;
use Livewire\Form;

class BeerForm extends Form
{
    #[Validate('required|string|max:255')]
    public string $name = '';

    #[Validate('nullable|string|max:255')]
    public ?string $tagline = null;

    #[Validate('required|string')]
    public string $description = '';

    #[Validate('required|date')]
    public string $first_brewed_at = '';

    #[Validate('required|numeric|min:0|max:99.9')]
    public float $abv = 0.0;

    #[Validate('required|integer|min:0')]
    public int $ibu = 0;

    #[Validate('required|integer|min:0')]
    public int $ebc = 0;

    #[Validate('required|numeric|min:0|max:14')]
    public float $ph = 0.0;

    #[Validate('required|integer|min:1')]
    public int $volume = 0;

    #[Validate('nullable|string')]
    public ?string $ingredients = null;

    #[Validate('nullable|string')]
    public ?string $brewer_tips = null;

    
    public function store(): Beer
    {
       return Beer::create($this->validate());
    }
}
