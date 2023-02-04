class Event < ApplicationRecord
  validates :kind, length: {maximum: 100}, presence: true
  validates :date, presence: true
  validates :title, length: {maximum: 100}, presence: true
  validates :speaker, length: {maximum: 100}, presence: true
  validates :host, length: {maximum: 100}, presence: true
end
