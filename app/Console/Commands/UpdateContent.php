<?php

namespace App\Console\Commands;

use App\Repositories\FBRepository;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;

class UpdateContent extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:update-content';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    protected $fbRepository;

    public function __construct(FBRepository $fbRepository)
    {
        parent::__construct();
        $this->fbRepository = $fbRepository;
    }

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->fbRepository->getFacebookPosts();
        $this->fbRepository->updateFBToken();
        Log::info('Task executed successfully!');
    }
}
