class JwtDenylist < ApplicationRecord
  include Devise::JWT::RevocationStrategies::Denylist

  self.table_name = "jwt_denylists"

  def self.cleanup_expired_tokens
    where("exp < ?", Time.current).destroy_all
  end
end
