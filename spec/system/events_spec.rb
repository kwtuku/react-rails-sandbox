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

  describe "詳細表示" do
    let!(:event) { create(:event, event_type: "Colloquium", event_date: "2022-07-21".to_date, title: "Investigating the Battle of Hastings", speaker: "Sarah Croix", host: "Jim Bradbury", published: false) }

    context "一覧ページから詳細ページに移動したとき" do
      it "詳細が表示される" do
        visit root_path

        expect(page).to have_content "Colloquium"
        expect(page).to have_current_path events_path

        click_link "2022-07-21 - Colloquium"

        expect(page).to have_content "Type: Colloquium"
        expect(page).to have_content "Date: 2022-07-21"
        expect(page).to have_content "Title: Investigating the Battle of Hastings"
        expect(page).to have_content "Speaker: Sarah Croix"
        expect(page).to have_content "Host: Jim Bradbury"
        expect(page).to have_content "Published: no"
        expect(page).to have_current_path "/events/#{event.id}"
      end
    end

    context "詳細ページの URL に直接移動したとき" do
      it "詳細が表示される" do
        visit "/events/#{event.id}"

        expect(page).to have_content "Type: Colloquium"
        expect(page).to have_content "Date: 2022-07-21"
        expect(page).to have_content "Title: Investigating the Battle of Hastings"
        expect(page).to have_content "Speaker: Sarah Croix"
        expect(page).to have_content "Host: Jim Bradbury"
        expect(page).to have_content "Published: no"
        expect(page).to have_current_path "/events/#{event.id}"
      end
    end

    context "存在しない id を使った詳細ページの URL に直接移動したとき" do
      it "EventNotFound コンポーネントが表示される" do
        visit "/events/0"

        expect(page).to have_content "Event not found!"
      end
    end
  end
end
