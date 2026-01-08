<?php

namespace App\Livewire\Components;

use Livewire\WithFileUploads;
use Livewire\Component;
use Illuminate\Support\Facades\Storage;
use Masmerise\Toaster\Toaster;
use App\Models\Beer;
use Livewire\Attributes\On;

class ImageUploader extends Component
{
    use WithFileUploads;

    public array $images = [];
    public array $existingImages = [];
    public ?\Illuminate\Database\Eloquent\Model $model = null;
    public string $storagePath = '';

    public function mount($model = null, array $existingImages = [], string $storagePath = '')
    {
        // #region agent log
        $logPath = base_path('.cursor/debug.log');
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'A', 'location' => 'ImageUploader.php:mount', 'message' => 'mount() called', 'data' => ['model_type' => $model ? get_class($model) : 'null', 'model_id' => $model?->id ?? null, 'existingImages_count' => count($existingImages), 'existingImages_sample' => !empty($existingImages) ? array_keys($existingImages[0] ?? []) : [], 'existingImages_first' => !empty($existingImages) ? $existingImages[0] : null, 'storagePath' => $storagePath], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        
        $this->model = $model;
        $this->storagePath = $storagePath;
        
        // Se o modelo foi passado mas não tem storagePath, define automaticamente
        if ($this->model && $this->model->id && empty($this->storagePath)) {
            $this->storagePath = "beers/{$this->model->id}";
        }
        
        // Sempre carrega as imagens do banco se tiver modelo, para garantir que está atualizado
        if ($this->model && $this->model->id) {
            // Carrega o relacionamento se não estiver carregado
            if (!$this->model->relationLoaded('images')) {
                $this->model->load('images');
            }
            
            $this->existingImages = $this->model->images->map(function($img) {
                // #region agent log
                $logPath = base_path('.cursor/debug.log');
                $fileExists = Storage::disk('public')->exists($img->path);
                $expectedUrl = asset('storage/' . ltrim($img->path, '/'));
                $fullPath = Storage::disk('public')->path($img->path);
                $symlinkExists = is_link(public_path('storage'));
                @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'J', 'location' => 'ImageUploader.php:mount', 'message' => 'loading image from DB', 'data' => ['image_id' => $img->id, 'image_path' => $img->path, 'is_cover' => $img->is_cover, 'file_exists' => $fileExists, 'full_path' => $fullPath, 'expected_url' => $expectedUrl, 'symlink_exists' => $symlinkExists], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
                // #endregion
                
                return [
                    'id' => $img->id,
                    'path' => $img->path,
                    'is_cover' => (bool)$img->is_cover,
                ];
            })->toArray();
        } else {
            // Se não tem modelo, usa as imagens passadas via parâmetro
            $this->existingImages = $existingImages;
        }
        
        // #region agent log
        $logPath = base_path('.cursor/debug.log');
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'A', 'location' => 'ImageUploader.php:mount', 'message' => 'mount() completed', 'data' => ['model_set' => $this->model !== null, 'model_id' => $this->model?->id ?? null, 'storagePath' => $this->storagePath, 'existingImages_count' => count($this->existingImages), 'existingImages_sample' => !empty($this->existingImages) ? $this->existingImages[0] : null], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
    }
    
    public function updatedModel($model)
    {
        if ($model && $model->id) {
            $this->storagePath = "beers/{$model->id}";
            $this->existingImages = $model->images()->get()->map(function($img) {
                return [
                    'id' => $img->id,
                    'path' => $img->path,
                    'is_cover' => $img->is_cover,
                ];
            })->toArray();
        }
    }
    
    #[On('beer-created')]
    public function handleBeerCreated($beerId = null)
    {
        // #region agent log
        $logPath = base_path('.cursor/debug.log');
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'E', 'location' => 'ImageUploader.php:handleBeerCreated', 'message' => 'beer-created event received', 'data' => ['beerId' => $beerId, 'beerId_type' => gettype($beerId), 'has_images' => !empty($this->images), 'images_count' => count($this->images)], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        
        if (!$beerId) {
            // #region agent log
            @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'E', 'location' => 'ImageUploader.php:handleBeerCreated', 'message' => 'beerId is null', 'data' => [], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
            // #endregion
            return;
        }
        
        $beer = Beer::find($beerId);
        if ($beer && !empty($this->images)) {
            // #region agent log
            @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'E', 'location' => 'ImageUploader.php:handleBeerCreated', 'message' => 'beer found, saving images directly', 'data' => ['beer_id' => $beer->id, 'images_count' => count($this->images)], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
            // #endregion
            
            // Salva as imagens diretamente sem precisar definir o modelo primeiro
            $storagePath = "beers/{$beer->id}";
            $hasCover = $beer->images()->where('is_cover', true)->exists();
            
            foreach ($this->images as $index => $image) {
                $path = $image->store($storagePath, 'public');
                
                // Define a primeira imagem como capa se não houver capa existente
                $isCover = !$hasCover && $index === 0;
                
                $beer->images()->create([
                    'path' => $path,
                    'is_cover' => $isCover,
                ]);
            }
            
            // Limpa as imagens temporárias
            $this->images = [];
            
            // Atualiza o modelo e a lista de imagens existentes
            $this->model = $beer;
            $this->storagePath = $storagePath;
            $this->existingImages = $beer->fresh()->images()->get()->map(function($img) {
                return [
                    'id' => $img->id,
                    'path' => $img->path,
                    'is_cover' => $img->is_cover,
                ];
            })->toArray();
            
            // #region agent log
            @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'E', 'location' => 'ImageUploader.php:handleBeerCreated', 'message' => 'images saved successfully', 'data' => ['beer_id' => $beer->id], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
            // #endregion
        } else if (!$beer) {
            // #region agent log
            @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'E', 'location' => 'ImageUploader.php:handleBeerCreated', 'message' => 'beer not found', 'data' => ['beerId' => $beerId], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
            // #endregion
        }
    }

    public function render()
    {
        // #region agent log
        $logPath = base_path('.cursor/debug.log');
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'B', 'location' => 'ImageUploader.php:render', 'message' => 'render() called', 'data' => ['model_set' => $this->model !== null], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        return view('livewire.components.image-uploader');
    }

    public function removeImage(int $index)
    {
        unset($this->images[$index]);
        $this->images = array_values($this->images);
    }

    public function removeExistingImage(int $id)
    {
        if (!$this->model) {
            Toaster::error('Modelo não definido para remover imagens.');
            return;
        }

        $image = $this->model->images()->find($id);
        if ($image) {
            // Remove o arquivo do storage
            if (Storage::disk('public')->exists($image->path)) {
                Storage::disk('public')->delete($image->path);
            }
            
            // Remove do banco de dados
            $image->delete();
            
            // Atualiza a lista de imagens existentes
            $this->existingImages = $this->model->fresh()->images()->get()->map(function($img) {
                return [
                    'id' => $img->id,
                    'path' => $img->path,
                    'is_cover' => $img->is_cover,
                ];
            })->toArray();
            
            Toaster::success('Imagem removida com sucesso!');
        }
    }

    public function saveImages()
    {
        // #region agent log
        $logPath = base_path('.cursor/debug.log');
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'D', 'location' => 'ImageUploader.php:saveImages', 'message' => 'saveImages() called', 'data' => ['model_set' => $this->model !== null, 'model_id' => $this->model?->id ?? null, 'images_count' => count($this->images), 'storagePath' => $this->storagePath], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        
        if (!$this->model) {
            Toaster::error('Modelo não definido para salvar imagens.');
            return;
        }

        if (empty($this->images)) {
            Toaster::warning('Nenhuma imagem para salvar.');
            return;
        }

        // Verifica se já existe uma imagem de capa
        $hasCover = $this->model->images()->where('is_cover', true)->exists();
        
        foreach ($this->images as $index => $image) {
            $path = $image->store($this->storagePath, 'public');
            
            // Define a primeira imagem como capa se não houver capa existente
            $isCover = !$hasCover && $index === 0;
            
            $this->model->images()->create([
                'path' => $path,
                'is_cover' => $isCover,
            ]);
        }

        // Atualiza a lista de imagens existentes
        $this->existingImages = $this->model->fresh()->images()->get()->map(function($img) {
            return [
                'id' => $img->id,
                'path' => $img->path,
                'is_cover' => $img->is_cover,
            ];
        })->toArray();
        
        // Limpa as imagens temporárias
        $this->images = [];
        
        // #region agent log
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'D', 'location' => 'ImageUploader.php:saveImages', 'message' => 'saveImages() completed', 'data' => ['existingImages_count' => count($this->existingImages)], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        
        Toaster::success('Imagens salvas com sucesso!');
    }
    
    public function setModel($beerId)
    {
        if (is_numeric($beerId)) {
            $beer = Beer::find($beerId);
        } else {
            $beer = $beerId;
        }
        
        if ($beer) {
            $this->model = $beer;
            $this->storagePath = "beers/{$beer->id}";
            $this->existingImages = $beer->images()->get()->map(function($img) {
                return [
                    'id' => $img->id,
                    'path' => $img->path,
                    'is_cover' => $img->is_cover,
                ];
            })->toArray();
            
            // Se houver imagens pendentes, salva automaticamente
            if (!empty($this->images)) {
                $this->saveImages();
            }
        }
    }
    
    /**
     * Salva imagens para um modelo específico (usado pelo componente pai)
     */
    public function saveImagesForModel(Beer $beer, array $images): void
    {
        // #region agent log
        $logPath = base_path('.cursor/debug.log');
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'G', 'location' => 'ImageUploader.php:saveImagesForModel', 'message' => 'saveImagesForModel() called', 'data' => ['beer_id' => $beer->id, 'images_count' => count($images)], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
        
        if (empty($images)) {
            return;
        }
        
        $storagePath = "beers/{$beer->id}";
        $hasCover = $beer->images()->where('is_cover', true)->exists();
        
        foreach ($images as $index => $image) {
            $path = $image->store($storagePath, 'public');
            
            // Define a primeira imagem como capa se não houver capa existente
            $isCover = !$hasCover && $index === 0;
            
            $beer->images()->create([
                'path' => $path,
                'is_cover' => $isCover,
            ]);
        }
        
        // #region agent log
        @file_put_contents($logPath, json_encode(['sessionId' => 'debug-session', 'runId' => 'run1', 'hypothesisId' => 'G', 'location' => 'ImageUploader.php:saveImagesForModel', 'message' => 'saveImagesForModel() completed', 'data' => ['beer_id' => $beer->id], 'timestamp' => round(microtime(true) * 1000)]) . "\n", FILE_APPEND);
        // #endregion
    }
}
