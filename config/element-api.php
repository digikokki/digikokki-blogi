<?php

use craft\elements\Entry;
use craft\helpers\UrlHelper;

return [
    'endpoints' => [
        'api/v1/youtube.json' => [
            'elementType' => Entry::class,
            'criteria' => ['section' => 'youtubeVideo'],
            'serializer' => 'dataArray',
            'transformer' => function(Entry $entry) {
                $images = [];
                foreach ($entry->youtubeThumpnail as $image) {
                  $images[] = $image->url;
                }
                return [
                    'title' => $entry->title,
                    'link'  => $entry->youtubeLink,
                    'image' => $images,
                    'category' => (string)$entry->youtubeCategory[0],
                    'date_published' => $entry->postDate->format("d.m.y"),

                ];
            },
            'pretty' => true,
        ],
    ]
];
