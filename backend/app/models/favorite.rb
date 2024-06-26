# frozen_string_literal: true

class Favorite < ApplicationRecord
  belongs_to :user
  belongs_to :recruitment

  validates :user_id, presence: true
  validates :recruitment_id, presence: true
end
