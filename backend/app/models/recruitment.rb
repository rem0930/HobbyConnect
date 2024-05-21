# frozen_string_literal: true

class Recruitment < ApplicationRecord
  belongs_to :location
  belongs_to :team

  validates :title, presence: true
  validates :description, presence: true
  validates :role, presence: true

  enum status: { open: 0, closed: 1 }
  enum role: { member: 0, opponent: 1, helper: 2 }

  def role_in_japanese
    I18n.t("recruitment.roles.#{role}")
  end
end
