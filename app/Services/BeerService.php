<?php

namespace App\Services;

use App\Models\Beer;

class BeerService
{
    public function getBeers(
        ?string $sortBy,
        string $sortDirection,
        array $filters = []
    ) {
        $query = Beer::query();

        // 🔍 Filtro por nome
        if (!empty($filters['name'])) {
            $query->where('name', 'like', '%' . $filters['name'] . '%');
        }

        // 🔢 Filtro por propriedade + regra + valor
            if (
                !empty($filters['property']) &&
                !empty($filters['operator']) &&
                isset($filters['value']) &&
                $filters['value'] !== ''
            ) {
                $query->where(
                    $filters['property'],
                    $filters['operator'],
                    $filters['value']
                );
            }


        // ↕️ Ordenação
        if ($sortBy) {
            $query->orderBy($sortBy, $sortDirection);
        }

        return $query->paginate(10);
    }
}
