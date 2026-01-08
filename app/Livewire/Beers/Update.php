<?php

namespace App\Livewire\Beers;

use Livewire\Component;
use App\Livewire\Forms\BeerForm;
use App\Models\Beer;

class Update extends Component
{
    public BeerForm $beerForm;
    public Beer $beer;

    public function mount(Beer $beer)
    {
        // Carrega o relacionamento de imagens
        $beer->load('images');
        
        $this->beer = $beer;

        // Preenche o form com os dados da cerveja
        $this->beerForm->setBeer($beer);
        
        // #region agent log
        $logPath = base_path('.cursor/debug.log');
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'I', 'location' => 'Update.php:mount', 'message' => 'mount() called', 'data' => ['beer_id' => $beer->id, 'images_count' => $beer->images->count(), 'images_sample' => $beer->images->first() ? ['id' => $beer->images->first()->id, 'path' => $beer->images->first()->path] : null], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
    }

    public function save()
    {
        $this->beerForm->update($this->beer);

        return redirect()
            ->route('beers.index')
            ->success("{$this->beerForm->name} atualizada com sucesso!");
    }

    public function render()
    {
        return view('livewire.beers.update');
    }
}
