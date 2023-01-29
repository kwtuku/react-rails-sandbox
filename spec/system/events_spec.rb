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

  describe "作成" do
    context "入力内容が有効なとき" do
      it "トーストメッセージが表示される、作成したイベントが表示される" do
        visit root_path

        expect(page).to have_link "New Event"
        expect(page).to have_current_path events_path

        click_link "New Event"

        expect(page).to have_field "Type:"
        expect(page).to have_current_path "/events/new"

        fill_in "Type:", with: "Colloquium"
        fill_in "Date:", with: "2022-04-12"
        fill_in "Title:", with: "Scholasticism in Medieval and Early Modern History"
        fill_in "Speakers:", with: "Robin Fleming"
        fill_in "Hosts:", with: "Henry Louis Gates Jr."
        check "Publish:"
        click_button "Save"

        expect(page).to have_content "Event Added!"
        expect(page).to have_current_path(/\/events\/\d+/)

        expect(page).to have_content "Type: Colloquium"
        expect(page).to have_content "Date: 2022-04-12"
        expect(page).to have_content "Title: Scholasticism in Medieval and Early Modern History"
        expect(page).to have_content "Speaker: Robin Fleming"
        expect(page).to have_content "Host: Henry Louis Gates Jr."
        expect(page).to have_content "Published: yes"
      end
    end

    context "入力内容が無効なとき" do
      it "エラーメッセージが表示される" do
        visit root_path

        expect(page).to have_link "New Event"
        expect(page).to have_current_path events_path

        click_link "New Event"

        expect(page).to have_field "Type:"
        expect(page).to have_current_path "/events/new"

        click_button "Save"

        expect(page).to have_content "The following errors prohibited the event from being saved:"
        expect(page).to have_current_path "/events/new"

        expect(page).to have_content "You must enter an event type"
        expect(page).to have_content "You must enter a valid date"
        expect(page).to have_content "You must enter a title"
        expect(page).to have_content "You must enter at least one speaker"
        expect(page).to have_content "You must enter at least one host"
      end
    end

    context "作成ページの URL に直接移動したとき" do
      it "フォームが表示される" do
        visit "/events/new"

        expect(page).to have_field "Type:"
        expect(page).to have_field "Date:"
        expect(page).to have_field "Title:"
        expect(page).to have_field "Speakers:"
        expect(page).to have_field "Hosts:"
        expect(page).to have_field "Publish:"
        expect(page).to have_current_path "/events/new"
      end
    end
  end

  describe "削除" do
    let!(:event) { create(:event, event_type: "Symposium", event_date: "2022-03-01".to_date) }

    it "トーストメッセージが表示される、削除したイベントのリンクが表示されなくなる" do
      visit root_path

      expect(page).to have_content "Symposium"
      expect(page).to have_current_path events_path

      click_link "2022-03-01 - Symposium"

      expect(page).to have_content "Type: Symposium"
      expect(page).to have_current_path "/events/#{event.id}"

      accept_confirm "Are you sure?" do
        click_button "Delete"
      end

      expect(page).to have_content "Event Deleted!"
      expect(page).to have_current_path events_path
      expect(page).not_to have_link "2022-03-01 - Symposium"
    end
  end
end
