# config valid for current version and patch releases of Capistrano
lock "~> 3.14.1"

set :application, "antipin.dev"
set :repo_url, "git@github.com:evgenyantipin/antipin.dev.git"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
set :deploy_to, "/home/deploy/antipin.dev"

set :yarn_flags, %w(--silent --no-progress)
# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"
set :linked_dirs, %w[node_modules]
# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure

namespace :deploy do
  desc "yarn build"
  task :yarn_build do
    on roles fetch(:yarn_roles) do
      within fetch(:yarn_target_path, release_path) do
        execute fetch(:yarn_bin), 'build'
      end
    end
  end
  before 'symlink:release', :yarn_build

  desc "restart nginx server"
  task :restart_nginx do
    on release_roles(:all) do
      within shared_path do
        execute :sudo, 'systemctl restart nginx'
      end
    end
  end
  after 'deploy:log_revision', :restart_nginx
end