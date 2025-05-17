<?php

namespace App\Filament\Resources\ProductResource\Pages;

use App\Enums\ProductVariationTypesEnum;
use App\Filament\Resources\ProductResource;
use App\Models\Product;
use Filament\Actions;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\SpatieMediaLibraryFileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Pages\EditRecord;

class ProductVariationTypes extends EditRecord
{
    protected static string $resource = ProductResource::class;
    protected static ?string $title = 'Variaciones del producto';
    protected static ?string $navigationIcon = 'heroicon-m-numbered-list';

    public function form(Form $form): Form
    {
        return $form
                ->schema([
                    Repeater::make('variationsTypes')
                        ->label('Variaciones')
                        ->relationship()
                        ->collapsible()
                        ->defaultItems(1)
                        ->addActionLAbel('Añadir nueva variación')
                        ->columns(2)
                        ->columnSpan(2)
                        ->schema([
                            TextInput::make('name')
                               ->required()
                                ->label('Nombre'),
                            Select::make('type')
                                ->required()
                                ->label('Tipo')
                                ->options(ProductVariationTypesEnum::labels()),
                            Repeater::make('options')
                                    ->label('Opciones')
                                    ->relationship()
                                    ->collapsible()
                                    ->schema([
                                        TextInput::make('name')
                                            ->label('Nombre')
                                            ->required(),
                                        SpatieMediaLibraryFileUpload::make('images')
                                            ->label('Imagenes')
                                            ->image()
                                            ->multiple()
                                            ->openable()
                                            ->panelLayout('grid')
                                            ->collection('images')
                                            ->reorderable()
                                            ->appendFiles()
                                            ->preserveFilenames()
                                            ->columnSpan(2)
                                    ])
                                    ->columnSpan(2)
                        ])
                ]);
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
