require "rails_helper"

RSpec.describe "イベント", type: :system do
  describe "一覧表示" do
    before do
      create(:event, event_type: "Symposium")
      create(:event, event_type: "Colloquium")
    end

    it "一覧が表示される" do
      visit root_path

      expect(page).to have_content "Symposium"
      expect(page).to have_content "Colloquium"
      expect(page).to have_current_path events_path
    end
  end
end
