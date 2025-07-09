namespace :jwt_denylist do
  desc "Clean up expired JWT tokens from denylist"
  task cleanup: :environment do
    deleted_count = JwtDenylist.cleanup_expired_tokens
    puts "Deleted #{deleted_count} expired tokens from denylist"
  end
end
