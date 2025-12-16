<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
use Rector\Laravel\Set\LaravelSetList;
use Rector\Set\ValueObject\LevelSetList;
use Rector\TypeDeclaration\Rector\ClassMethod\AddVoidReturnTypeWhereNoReturnRector;
use Rector\DeadCode\Rector\ClassMethod\RemoveUnusedPrivateMethodRector;
use Rector\DeadCode\Rector\Property\RemoveUnusedPrivatePropertyRector;

return static function (RectorConfig $rectorConfig): void {

    /**
     * 1️⃣ Paths – ONLY business code
     */
    $rectorConfig->paths([
        __DIR__ . '/app',
        __DIR__ . '/routes',
        __DIR__ . '/database',
        __DIR__ . '/tests',
    ]);

    /**
     * 2️⃣ Skip dangerous locations
     */
    $rectorConfig->skip([
        __DIR__ . '/vendor',
        __DIR__ . '/storage',
        __DIR__ . '/bootstrap/cache',

        // ❗ Do not touch compiled files
        __DIR__ . '/public',
    ]);

    /**
     * 3️⃣ Language & Framework level
     * Laravel 12 → PHP 8.3
     */
    $rectorConfig->sets([
        LevelSetList::UP_TO_PHP_83,
        LaravelSetList::LARAVEL_120,
    ]);

    /**
     * 4️⃣ Enterprise safety switches
     */
    $rectorConfig->importNames();
    $rectorConfig->importShortClasses(false);
    $rectorConfig->removeUnusedImports(false);

    /**
     * 5️⃣ Enable ONLY SAFE rectors
     */
    $rectorConfig->rules([
        // Add ": void" where method has no return
        AddVoidReturnTypeWhereNoReturnRector::class,

        // Remove unused PRIVATE code only
        RemoveUnusedPrivateMethodRector::class,
        RemoveUnusedPrivatePropertyRector::class,
    ]);

    /**
     * 6️⃣ Performance (large codebases)
     */
    $rectorConfig->parallel();
    $rectorConfig->memoryLimit('2G');
};
