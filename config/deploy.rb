# config valid only for current version of Capistrano
lock "3.9.0"

set :application, "digikokki-blogi"
set :repo_url, "https://github.com/digikokki/digikokki-blogi.git"
set :deploy_to, "/var/www/html/craft"
set :keep_releases, 2

set :file_permissions_roles, :all
set :file_permissions_paths, ["storage", "web/cpresources"]
set :file_permissions_users, ["www-data"]
set :file_permissions_groups, ["www-data"]
set :file_permissions_chmod_mode, "0744"

append :linked_files, ".env"
append :linked_dirs, "vendor"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", "config/secrets.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5
