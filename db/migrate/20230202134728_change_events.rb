class ChangeEvents < ActiveRecord::Migration[7.0]
  def up
    change_table :events do |t|
      t.rename :event_type, :kind
      t.rename :event_date, :date
      t.change :title, :string
    end

    change_column_null :events, :kind, false
    change_column_null :events, :date, false
    change_column_null :events, :title, false
    change_column_null :events, :speaker, false
    change_column_null :events, :host, false
    change_column_null :events, :published, false

    change_column_default :events, :published, from: nil, to: false
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
