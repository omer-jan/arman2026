<?php

declare(strict_types=1);

use Rector\Config\RectorConfig;
// use Rector\Laravel\Set\LaravelSetList;
use Rector\DeadCode\Rector\ClassMethod\RemoveUnusedPrivateMethodRector;
use Rector\DeadCode\Rector\Property\RemoveUnusedPrivatePropertyRector;
use Rector\Set\ValueObject\LevelSetList;
use Rector\TypeDeclaration\Rector\ClassMethod\AddVoidReturnTypeWhereNoReturnRector;

return static function (RectorConfig $rectorConfig): void {

    /**
     * 1️⃣ Process ONLY business code
     */
    $rectorConfig->paths([
        __DIR__.'/app',
        __DIR__.'/routes',
        __DIR__.'/database',
        __DIR__.'/tests',
    ]);

    /**
     * 2️⃣ Skip generated & dangerous paths
     */
    $rectorConfig->skip([
        __DIR__.'/vendor',
        __DIR__.'/storage',
        __DIR__.'/bootstrap/cache',
        __DIR__.'/public',
    ]);

    /**
     * 3️⃣ Language & Framework level
     */
    $rectorConfig->sets([
        LevelSetList::UP_TO_PHP_83,
        //  LaravelSetList::LARAVEL_120,
    ]);

    /**
     * 4️⃣ Enterprise safety rules
     * Let Pint handle formatting & imports
     */
    $rectorConfig->importNames(false);
    $rectorConfig->importShortClasses(false);
    $rectorConfig->removeUnusedImports(false);

    /**
     * 5️⃣ SAFE rectors only
     */
    $rectorConfig->rules([
        AddVoidReturnTypeWhereNoReturnRector::class,
        RemoveUnusedPrivateMethodRector::class,
        RemoveUnusedPrivatePropertyRector::class,
    ]);

    /**
     * 6️⃣ Performance for large codebases
     */
    $rectorConfig->parallel();
    $rectorConfig->memoryLimit('2G');
};
