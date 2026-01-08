<?php

namespace App\Livewire\Beers;

use Livewire\Component;
use App\Livewire\Forms\BeerForm;
use App\Models\Beer;

class Create extends Component
{
    public BeerForm $beerForm;
    public ?Beer $beer = null;

    public function save()
    {
        // #region agent log
        $logPath = base_path('.cursor/debug.log');
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'F', 'location' => 'Create.php:save', 'message' => 'save() called', 'data' => [], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        
        $beer = $this->beerForm->store();
        $this->beer = $beer;

        // #region agent log
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'F', 'location' => 'Create.php:save', 'message' => 'beer created, dispatching event', 'data' => ['beer_id' => $beer->id], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion

        // Dispara evento para o componente ImageUploader salvar as imagens automaticamente
        $this->dispatch('beer-created', beerId: $beer->id);

        return redirect()
            ->route('beers.index')
            ->success("{$this->beerForm->name} criada com sucesso!");
    }

    public function render()
    {
        return view('livewire.beers.create');
    }
}
